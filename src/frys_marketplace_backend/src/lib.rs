mod state;
mod types;
mod ordinals;
mod payment;
mod frys_interface;
mod minting;

use crate::minting::NFT;
use candid::candid_method;
// use ic_cdk_macros::*;

use crate::state::STATE;
use crate::types::{
    SystemStats,
    Collection,
    MintRequest,
    MintResponse
};

// Initialize state
// #[init]
#[candid_method(init)]
fn init() {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.next_inscription_id = 0;
        state.inscriptions.clear();
        state.collections.clear();
    });
}

// System stats query
// #[query]
#[candid_method(query)]
fn get_stats() -> SystemStats {
    STATE.with(|state| {
        let state = state.borrow();
        SystemStats {
            total_inscriptions: state.next_inscription_id,
            total_frys_locked: state.total_frys_locked(),
            total_collections: state.collections.len() as u64,
        }
    })
}

// Collection queries
// #[query]
#[candid_method(query)]
fn get_collection_info(name: String) -> Option<Collection> {
    STATE.with(|state| {
        let state = state.borrow();
        state.collections.get(&name).cloned()
    })
}

// #[query]
#[candid_method(query)]
fn get_collection_floor(name: String) -> Option<u64> {
    STATE.with(|state| {
        let state = state.borrow();
        state.collections.get(&name).and_then(|c| c.floor_price)
    })
}

// #[query]
#[candid_method(query)]
fn get_collection_stats(name: String) -> Option<Collection> {
    STATE.with(|state| {
        let state = state.borrow();
        state.collections.get(&name).cloned()
    })
}

// #[update]
#[candid_method(update)]
async fn mint_inscription(request: MintRequest) -> Result<MintResponse, String> {
    let caller = ic_cdk::caller();

    // Store frys_amount before moving request
    let frys_amount = request.frys_amount;

    // Verify and lock FRYS tokens first
    frys_interface::verify_and_lock_frys(caller, frys_amount).await?;

    // Update request with caller as creator
    let mut request = request;
    request.metadata.creator = caller;

    // If FRYS verification succeeds, proceed with minting
    match ordinals::mint_inscription(request).await {
        Ok(response) => Ok(response),
        Err(e) => {
            // If minting fails, unlock the FRYS tokens
            if let Err(unlock_err) = frys_interface::unlock_frys(caller, frys_amount).await {
                ic_cdk::println!("Failed to unlock FRYS tokens: {}", unlock_err);
            }
            Err(e)
        }
    }
}

ic_cdk::export_candid!(); 