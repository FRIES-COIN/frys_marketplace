use candid::{CandidType, Nat, Principal};
use ic_cdk::storage;
use ic_cdk::{api::call, caller, post_upgrade, pre_upgrade, query, update};
use icrc_ledger_types::{
    icrc1::account::Account,
    icrc2::transfer_from::{TransferFromArgs, TransferFromError},
};
use serde_derive::{Deserialize, Serialize};
use serde_json::json;
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Serialize, Clone)]
struct Payment {
    id: String,
    block_height: Nat,
    amount: f64,
    payer: String,
}

thread_local! {
    static PAYMENT_STORE: RefCell<HashMap<String, Payment>> = RefCell::new(HashMap::new());
    static LEDGER_CANISTER_ID: RefCell<Principal> = RefCell::new(
        Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap()
    );
}

// Persisting storage
#[pre_upgrade]
fn pre_upgrade() {
    let payments = PAYMENT_STORE.with(|store| store.borrow().clone());
    storage::stable_save((payments,)).expect("Failed to save payments");
}

#[post_upgrade]
fn post_upgrade() {
    let (payments,): (HashMap<String, Payment>,) =
        storage::stable_restore().expect("Failed to restore payments");
    PAYMENT_STORE.with(|store| *store.borrow_mut() = payments);
}

#[update(name = "payment")]
async fn payment(id: String, price: f64) -> String {
    let ledger_canister_id = LEDGER_CANISTER_ID.with(|id| id.borrow().clone());

    let principal = ledger_canister_id;
    let transfer_args = TransferFromArgs {
        from: Account {
            owner: caller(),
            subaccount: None,
        },
        to: Account {
            owner: ic_cdk::id(),
            subaccount: None,
        },
        amount: Nat::from(price as u64),
        fee: None,
        memo: None,
        created_at_time: None,
        spender_subaccount: None,
    };

    let transfer_result = call::call::<(TransferFromArgs,), (Result<Nat, TransferFromError>,)>(
        principal,
        "icrc2_transfer_from",
        (transfer_args,),
    )
    .await;

    match transfer_result {
        Ok((Ok(block_height),)) => {
            let payment = Payment {
                id: id.clone(),
                block_height,
                amount: price,
                payer: caller().to_string(),
            };

            PAYMENT_STORE.with(|store| store.borrow_mut().insert(id.clone(), payment.clone()));

            serde_json::to_string(&payment).unwrap()
        }

        Ok((Err(e),)) => {
            serde_json::to_string(&json!({"error": format!("Transfer error: {:?}", e)})).unwrap()
        }
        Err(error) => {
            serde_json::to_string(&json!({"error": format!("Call error: {:?}", error)})).unwrap()
        }
    }
}

ic_cdk::export_candid!();
