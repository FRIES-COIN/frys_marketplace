mod state;
mod types;
mod ordinals;
mod payment;
mod frys_interface;

use candid::candid_method;
use ic_cdk_macros::*;

use crate::state::STATE;
use crate::types::{SystemStats, Inscription, Collection};

// Re-export main functions
pub use ordinals::{
    get_inscription,
    get_user_inscriptions,
    get_rarest_inscriptions,
    get_inscriptions_by_sat_range,
    get_inscriptions_by_generation
};

// Initialize state
#[init]
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
#[query]
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
#[query]
#[candid_method(query)]
fn get_collection_info(name: String) -> Option<Collection> {
    STATE.with(|state| {
        let state = state.borrow();
        state.collections.get(&name).cloned()
    })
}

#[query]
#[candid_method(query)]
fn get_collection_floor(name: String) -> Option<u64> {
    STATE.with(|state| {
        let state = state.borrow();
        state.collections.get(&name).and_then(|c| c.floor_price)
    })
}

#[query]
#[candid_method(query)]
fn get_collection_stats(name: String) -> Option<Collection> {
    STATE.with(|state| {
        let state = state.borrow();
        state.collections.get(&name).cloned()
    })
}
