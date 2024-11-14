use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;
use ic_cdk::{update, query};

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
}

// #[pre_upgrade]
// fn pre_upgrade() {
//     let collections = COLLECTIONS.with(|c| c.borrow().clone());
//     let nfts = NFTS.with(|n| n.borrow().clone());
//     let next_collection_id = NEXT_COLLECTION_ID.with(|id| *id.borrow());
//     let next_nft_id = NEXT_NFT_ID.with(|id| *id.borrow());
    
//     storage::stable_save((collections, nfts, next_collection_id, next_nft_id))
//         .expect("Failed to save state");
// }

// #[post_upgrade]
// fn post_upgrade() {
//     let (collections, nfts, next_collection_id, next_nft_id): (
//         HashMap<u64, Collection>,
//         HashMap<u64, NFT>,
//         u64,
//         u64,
//     ) = storage::stable_restore().expect("Failed to restore state");

//     COLLECTIONS.with(|c| *c.borrow_mut() = collections);
//     NFTS.with(|n| *n.borrow_mut() = nfts);
//     NEXT_COLLECTION_ID.with(|id| *id.borrow_mut() = next_collection_id);
//     NEXT_NFT_ID.with(|id| *id.borrow_mut() = next_nft_id);
// }

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
) -> Result<NFT, String> {
    let caller = ic_cdk::caller();

    // Verify FRYS payment first
    let payment_verified = PENDING_MINTS.with(|pm| {
        pm.borrow().contains_key(&caller)
    });

    if !payment_verified {
        return Err("FRYS token payment required before minting".to_string());
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