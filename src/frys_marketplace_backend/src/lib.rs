mod state;
mod types;
mod ordinals;
mod payment;
mod frys_interface;
mod minting;

use std::collections::HashMap;

use crate::minting::Collection;
use candid::Principal;
use minting::NFTS;
use minting::{ COLLECTIONS, NFT, NEXT_COLLECTION_ID, NEXT_NFT_ID, PendingMint, PENDING_MINTS };
use payment::Payment;
use payment::PAYMENT_STORE;
// use ic_cdk_macros::*;

// use crate::state::STATE;
use ic_cdk::{post_upgrade, pre_upgrade, storage };

// use crate::types::{
//     SystemStats,
//     Collection,
//     MintRequest,
//     MintResponse
// };

// Initialize state
// #[init]
// #[candid_method(init)]
// fn init() {
//     STATE.with(|state| {
//         let mut state = state.borrow_mut();
//         state.next_inscription_id = 0;
//         state.inscriptions.clear();
//         state.collections.clear();
//     });
// }

// // System stats query
// // #[query]
// #[candid_method(query)]
// fn get_stats() -> SystemStats {
//     STATE.with(|state| {
//         let state = state.borrow();
//         SystemStats {
//             total_inscriptions: state.next_inscription_id,
//             total_frys_locked: state.total_frys_locked(),
//             total_collections: state.collections.len() as u64,
//         }
//     })
// }

// // Collection queries
// // #[query]
// #[candid_method(query)]
// fn get_collection_info(name: String) -> Option<Collection> {
//     STATE.with(|state| {
//         let state = state.borrow();
//         state.collections.get(&name).cloned()
//     })
// }

// // #[query]
// #[candid_method(query)]
// fn get_collection_floor(name: String) -> Option<u64> {
//     STATE.with(|state| {
//         let state = state.borrow();
//         state.collections.get(&name).and_then(|c| c.floor_price)
//     })
// }

// // #[query]
// #[candid_method(query)]
// fn get_collection_stats(name: String) -> Option<Collection> {
//     STATE.with(|state| {
//         let state = state.borrow();
//         state.collections.get(&name).cloned()
//     })
// }

// // #[update]
// #[candid_method(update)]
// async fn mint_inscription(request: MintRequest) -> Result<MintResponse, String> {
//     let caller = ic_cdk::caller();

//     // Store frys_amount before moving request
//     let frys_amount = request.frys_amount;

//     // Verify and lock FRYS tokens first
//     frys_interface::verify_and_lock_frys(caller, frys_amount).await?;

//     // Update request with caller as creator
//     let mut request = request;
//     request.metadata.creator = caller;

//     // If FRYS verification succeeds, proceed with minting
//     match ordinals::mint_inscription(request).await {
//         Ok(response) => Ok(response),
//         Err(e) => {
//             // If minting fails, unlock the FRYS tokens
//             if let Err(unlock_err) = frys_interface::unlock_frys(caller, frys_amount).await {
//                 ic_cdk::println!("Failed to unlock FRYS tokens: {}", unlock_err);
//             }
//             Err(e)
//         }
//     }
// }

// Persisting storage
// #[pre_upgrade]
fn pre_upgrade() {
    // Create empty state if this is first deployment
    let state = (
        PAYMENT_STORE.with(|store| store.borrow().clone()),
        COLLECTIONS.with(|c| c.borrow().clone()),
        NFTS.with(|n| n.borrow().clone()),
        PENDING_MINTS.with(|pm| pm.borrow().clone()),
        NEXT_COLLECTION_ID.with(|id| *id.borrow()),
        NEXT_NFT_ID.with(|id| *id.borrow())
    );
    
    storage::stable_save((state,)).expect("Failed to save state");
}

// #[post_upgrade]
fn post_upgrade() {
    let (state,): ((
        HashMap<String, Payment>,
        HashMap<u64, Collection>,
        HashMap<u64, NFT>,
        HashMap<Principal, PendingMint>,
        u64,
        u64
    ),) = storage::stable_restore().expect("Failed to restore state");

    let (payments, collections, nfts, pending_mints, next_collection_id, next_nft_id) = state;

    PAYMENT_STORE.with(|store| *store.borrow_mut() = payments);
    COLLECTIONS.with(|c| *c.borrow_mut() = collections);
    NFTS.with(|n| *n.borrow_mut() = nfts);
    PENDING_MINTS.with(|pm| *pm.borrow_mut() = pending_mints);
    NEXT_COLLECTION_ID.with(|id| *id.borrow_mut() = next_collection_id);
    NEXT_NFT_ID.with(|id| *id.borrow_mut() = next_nft_id);
}

ic_cdk::export_candid!(); 