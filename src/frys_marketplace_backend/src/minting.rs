use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;
use ic_cdk::{query, update};

#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
pub struct Collection {
    pub id: u64,
    pub name: String,
    pub creator: Principal,
    pub created_at: u64,
    pub nft_count: u64,
}

#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
pub struct NFT {
    pub id: u64,
    pub minter_principal_id: Principal,
    pub nft_image: Vec<Vec<u8>>,
    pub collection_id: u64,
    pub nft_description: String,
    pub price_in_icp_tokens: u64,
    pub created_at: u64,
}

#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
pub struct PendingMint {
    pub principal_id: Principal,
    pub transaction_block: u64,
    pub amount_paid: u64,
    pub timestamp: u64,
}

thread_local! {
    pub static COLLECTIONS: RefCell<HashMap<u64, Collection>> = RefCell::new(HashMap::new());
    pub static NFTS: RefCell<HashMap<u64, NFT>> = RefCell::new(HashMap::new());
    pub static NEXT_COLLECTION_ID: RefCell<u64> = RefCell::new(0);
    pub static NEXT_NFT_ID: RefCell<u64> = RefCell::new(0);
    pub static PENDING_MINTS: RefCell<HashMap<Principal, PendingMint>> = RefCell::new(HashMap::new());
    pub static MINT_PASSWORD: RefCell<String> = RefCell::new(String::from(""));
}

// Approved callers
// #[query]
// pub fn is_allowed_principal() -> bool {
//     let allowed_principals = vec![
//         Principal::from_text("mdpn6-pyg7q-bwfjn-cxmnr-cciq7-7aqig-kxkt7-bk2ps-nzuqn-mst5t-hqe").unwrap(),
//         Principal::from_text("3r4ur-bi57q-dnrjp-fdl3f-pd5ud-gux43-l6bk6-ff7p3-33zk4-nx7ym-mqe").unwrap(), 
//         Principal::from_text("3ut3n-6rt35-45boi-6vidq-fur7n-5jlvg-wggto-dqwcr-gwtuk-rst7y-zae").unwrap(), 
//     ];

//     let caller_principal = caller();

//     allowed_principals.contains(&caller_principal)
// }

#[update(name = "who_am_i")]
pub fn who_am_i() -> Principal {
    let caller = ic_cdk::caller();
    return caller;
}

const AUTHORIZED_PRINCIPALS: [&str; 3] = [
    "mdpn6-pyg7q-bwfjn-cxmnr-cciq7-7aqig-kxkt7-bk2ps-nzuqn-mst5t-hqe",
    "3r4ur-bi57q-dnrjp-fdl3f-pd5ud-gux43-l6bk6-ff7p3-33zk4-nx7ym-mqe", 
    "3ut3n-6rt35-45boi-6vidq-fur7n-5jlvg-wggto-dqwcr-gwtuk-rst7y-zae"
];

fn is_authorized() -> bool {
    let caller = ic_cdk::caller().to_text();
    AUTHORIZED_PRINCIPALS.contains(&caller.as_str())
}

#[update(name = "verify_frys_payment")]
fn verify_frys_payment(transaction_block: u64, amount: u64) -> Result<bool, String> {
    let caller = ic_cdk::caller();
    
    let pending_mint = PendingMint {
        principal_id: caller,
        transaction_block,
        amount_paid: amount,
        timestamp: ic_cdk::api::time(),
    };

    PENDING_MINTS.with(|pm| {
        pm.borrow_mut().insert(caller, pending_mint);
    });

    Ok(true)
}

#[update(name = "create_collection")]
fn create_collection(name: String) -> Result<Collection, String> {
   
    if !is_authorized() {
        return Err("Unauthorized: Only approved principals can mint NFTs".to_string());
    }

    let caller = ic_cdk::caller();
    let id = NEXT_COLLECTION_ID.with(|id| {
        let current = *id.borrow();
        *id.borrow_mut() += 1;
        current
    });

    // Add predefined collections
    let collections = vec![
        ("Frys Genesis", caller),
        ("Frys Legends", caller),
        ("Frys Rare", caller),
        ("Frys Common", caller)
    ];

    COLLECTIONS.with(|c| {
        let mut collections_map = c.borrow_mut();
        for (collection_name, creator) in collections {
            collections_map.insert(id, Collection {
                id,
                name: collection_name.to_string(),
                creator,
                created_at: ic_cdk::api::time(),
                nft_count: 0,
            });
        }
    });

    // Return the last created collection
    let collection = Collection {
        id,
        name,
        creator: caller,
        created_at: ic_cdk::api::time(),
        nft_count: 0,
    };

    COLLECTIONS.with(|c| c.borrow_mut().insert(id, collection.clone()));
    Ok(collection)
}

#[update(name = "mint_nft")]
fn mint_nft(
    nft_image: Vec<Vec<u8>>,
    collection_id: u64,
    nft_description: String,
    price_in_icp_tokens: u64,
    password: String,
) -> Result<NFT, String> {
    let caller = ic_cdk::caller();

    // Verify FRYS payment first
    let payment_verified = PENDING_MINTS.with(|pm| {
        pm.borrow().contains_key(&caller)
    });

    if !payment_verified {
        return Err("FRYS token payment required before minting".to_string());
    }

    // if !is_authorized() {
    //     return Err("Unauthorized: Only approved principals can mint NFTs".to_string());
    // }

    let stored_password = MINT_PASSWORD.with(|p| p.borrow().clone()); 
    // let stored_password = "FRYS@2024#1234".to_string(); 
    
    if password != stored_password {
        return Err("Invalid password for minting".to_string());
    }

    // Verify collection exists
    let collection_exists = COLLECTIONS.with(|c| c.borrow().contains_key(&collection_id));
    if !collection_exists {
        return Err("Collection not found".to_string());
    }

    let id = NEXT_NFT_ID.with(|id| {
        let current = *id.borrow();
        *id.borrow_mut() += 1;
        current
    });

    let nft = NFT {
        id,
        minter_principal_id: caller,
        nft_image,
        collection_id,
        nft_description,
        price_in_icp_tokens,
        created_at: ic_cdk::api::time(),
    };

    NFTS.with(|n| n.borrow_mut().insert(id, nft.clone()));
    
    // Increment collection NFT count
    COLLECTIONS.with(|c| {
        if let Some(collection) = c.borrow_mut().get_mut(&collection_id) {
            collection.nft_count += 1;
        }
    });

    Ok(nft)
}

#[update(name = "delete_nft")]
fn delete_nft(nft_id: u64) -> Result<(), String> {
    // let caller = ic_cdk::caller();
    
    if !is_authorized() {
        return Err("Unauthorized: Only approved principals can mint NFTs".to_string());
    }
    // Get the NFT first to check ownership and update collection count
    let nft = NFTS.with(|nfts| {
        nfts.borrow()
            .get(&nft_id)
            .cloned()
    });

    match nft {
        Some(nft) => {
            // Decrement collection NFT count
            COLLECTIONS.with(|c| {
                if let Some(collection) = c.borrow_mut().get_mut(&nft.collection_id) {
                    collection.nft_count = collection.nft_count.saturating_sub(1);
                }
            });

            // Remove the NFT
            NFTS.with(|nfts| {
                nfts.borrow_mut().remove(&nft_id);
            });

            Ok(())
        },
        None => Err("NFT not found".to_string())
    }
}

#[query(name = "get_all_nfts")]
fn get_all_nfts() -> Vec<NFT> {
    NFTS.with(|nfts| {
        nfts.borrow()
            .values()
            .cloned()
            .collect()
    })
}

#[query(name = "get_all_collections")]
fn get_all_collections() -> Vec<Collection> {
    COLLECTIONS.with(|collections| {
        collections.borrow()
            .values()
            .cloned()
            .collect()
    })
}

#[query(name = "get_collection_nfts")]
fn get_collection_nfts(collection_id: u64) -> Vec<NFT> {
    NFTS.with(|nfts| {
        nfts.borrow()
            .values()
            .filter(|nft| nft.collection_id == collection_id)
            .cloned()
            .collect()
    })
}

#[query(name = "get_nft_by_id")]
fn get_nft_by_id(nft_id: u64) -> Option<NFT> {
    NFTS.with(|nfts| {
        nfts.borrow()
            .get(&nft_id)
            .cloned()
    })
}