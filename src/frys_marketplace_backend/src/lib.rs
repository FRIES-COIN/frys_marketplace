mod state;
mod types;
mod ordinals;
mod payment;
mod minting;

use std::collections::HashMap;

use crate::minting::Collection;
use candid::Principal;
use minting::{MINT_PASSWORD, NFTS};
use minting::{ COLLECTIONS, NFT, NEXT_COLLECTION_ID, NEXT_NFT_ID, PendingMint, PENDING_MINTS };
use payment::Payment;
use payment::PAYMENT_STORE;
use state::{State, STATE};
use types::{MintRequest, MintResponse};
use crate::payment::TokenType;
use crate::payment::{PendingTransfer, PENDING_TRANSFERS};
use crate::ordinals::mint_inscription; 
// use std::cell::RefCell;

use ic_cdk::{export_candid, post_upgrade, pre_upgrade, query, storage, update };

use ic_cdk::init;

// thread_local! {
//     static TEST_COUNTER: RefCell<u64> = RefCell::new(0);
// }

// Expose canister functions in files
// #[update]
// pub async fn verify_frys_payment(caller: Principal, amount: u64) -> Result<(), String> {
//     verify_and_lock_frys(caller, amount).await
// }

#[update]
pub async fn create_inscription(request: MintRequest) -> Result<MintResponse, String> {
    mint_inscription(request).await
}

#[query]
pub fn get_state_info() -> State {
    STATE.with(|state| state.borrow().clone())
}

#[init]
fn init() {
MINT_PASSWORD.with(|password| {
    *password.borrow_mut() = std::env::var("MINT_PASSWORD")
        .unwrap_or_else(|_| String::from(""));
});
    
// Initialize other state containers with default values
STATE.with(|s| *s.borrow_mut() = State::default());
PAYMENT_STORE.with(|store| *store.borrow_mut() = HashMap::new());
PENDING_TRANSFERS.with(|pt| *pt.borrow_mut() = HashMap::new());
#[pre_upgrade]
fn pre_upgrade() {
    let state = (
        PAYMENT_STORE.with(|store| store.borrow().clone()),
        COLLECTIONS.with(|c| c.borrow().clone()),
        NFTS.with(|n| n.borrow().clone()),
        PENDING_MINTS.with(|pm| pm.borrow().clone()),
        NEXT_COLLECTION_ID.with(|id| *id.borrow()),
        NEXT_NFT_ID.with(|id| *id.borrow()),
        STATE.with(|s| s.borrow().clone()),
        PENDING_TRANSFERS.with(|pt| pt.borrow().clone()),
    );
    
    storage::stable_save((state,)).expect("Failed to save state");
}
}

#[post_upgrade]
fn post_upgrade() {
    let (state,): ((
        HashMap<String, Payment>,
        HashMap<u64, Collection>,
        HashMap<u64, NFT>,
        HashMap<Principal, PendingMint>,
        u64,
        u64,
        State,
        HashMap<String, PendingTransfer>,
    ),) = storage::stable_restore().expect("Failed to restore state");

    let (payments, collections, nfts, pending_mints, next_collection_id, next_nft_id, ordinals_state, pending_transfers) = state;

    PAYMENT_STORE.with(|store| *store.borrow_mut() = payments);
    COLLECTIONS.with(|c| *c.borrow_mut() = collections);
    NFTS.with(|n| *n.borrow_mut() = nfts);
    PENDING_MINTS.with(|pm| *pm.borrow_mut() = pending_mints);
    NEXT_COLLECTION_ID.with(|id| *id.borrow_mut() = next_collection_id);
    NEXT_NFT_ID.with(|id| *id.borrow_mut() = next_nft_id);
    STATE.with(|s| *s.borrow_mut() = ordinals_state);
    PENDING_TRANSFERS.with(|pt| *pt.borrow_mut() = pending_transfers);
}

// Test if stable storage

// #[update]
// pub fn increment_counter() -> u64 {
//     TEST_COUNTER.with(|counter| {
//         let mut count = counter.borrow_mut();
//         *count += 1;
//         *count
//     })
// }

// #[query]
// pub fn get_counter() -> u64 {
//     TEST_COUNTER.with(|counter| *counter.borrow())
// }

export_candid!();
