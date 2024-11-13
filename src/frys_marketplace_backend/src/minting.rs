use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;
use ic_cdk::{post_upgrade, pre_upgrade, storage, update};

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

thread_local! {
    static COLLECTIONS: RefCell<HashMap<u64, Collection>> = RefCell::new(HashMap::new());
    static NFTS: RefCell<HashMap<u64, NFT>> = RefCell::new(HashMap::new());
    static NEXT_COLLECTION_ID: RefCell<u64> = RefCell::new(0);
    static NEXT_NFT_ID: RefCell<u64> = RefCell::new(0);
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

#[update(name = "create_collection")]
fn create_collection(name: String) -> Result<Collection, String> {
    let caller = ic_cdk::caller();
    let id = NEXT_COLLECTION_ID.with(|id| {
        let current = *id.borrow();
        *id.borrow_mut() += 1;
        current
    });

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