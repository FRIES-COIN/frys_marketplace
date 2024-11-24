use candid::{CandidType, Nat, Principal};
use ic_cdk::{api::call, storage, caller, update, pre_upgrade, post_upgrade};
use icrc_ledger_types::{
    icrc1::account::Account,
    icrc2::transfer_from::{TransferFromArgs, TransferFromError},
};
use serde_derive::{Deserialize, Serialize};
use serde_json::json;
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Serialize, Clone)]
pub struct Payment {
    id: String,
    block_height: Nat,
    amount: f64,
    payer: String,
    token_type: TokenType,
}

#[derive(CandidType, Deserialize, Serialize, Clone)]
pub enum TokenType {
    FRYS,
    ICP,
    CKBTC,
}

thread_local! {
    pub static PAYMENT_STORE: RefCell<HashMap<String, Payment>> = RefCell::new(HashMap::new());
    pub static ICP_LEDGER_ID: RefCell<Principal> = RefCell::new(
        Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap()
    );
    pub static CKBTC_LEDGER_ID: RefCell<Principal> = RefCell::new(
        Principal::from_text("mxzaz-hqaaa-aaaar-qaada-cai").unwrap()
    );
    pub static FRYS_LEDGER_ID: RefCell<Principal> = RefCell::new(
        Principal::from_text("ezu5v-7qaaa-aaaam-acpbq-cai").unwrap()
    );
}

#[update(name = "payment")]
async fn payment(id: String, price: f64, token_type: TokenType) -> String {
    let ledger_canister_id = match token_type {
        TokenType::ICP => ICP_LEDGER_ID.with(|id| id.borrow().clone()),
        TokenType::CKBTC => CKBTC_LEDGER_ID.with(|id| id.borrow().clone()),
        TokenType::FRYS => FRYS_LEDGER_ID.with(|id|id.borrow().clone()),
    };

    let transfer_args = TransferFromArgs {
        from: Account {
            owner: caller(),
            subaccount: None,
        },
        to: Account {
            owner: Principal::from_text("mdpn6-pyg7q-bwfjn-cxmnr-cciq7-7aqig-kxkt7-bk2ps-nzuqn-mst5t-hqe").unwrap(),
            subaccount: None,
        },
        amount: Nat::from(price as u64),
        fee: None,
        memo: None,
        created_at_time: None,
        spender_subaccount: None,
    };

    let transfer_result = call::call::<(TransferFromArgs,), (Result<Nat, TransferFromError>,)>(
        ledger_canister_id,
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
                token_type,
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
// #[pre_upgrade]
// fn pre_upgrade() {
//     let payment_store = PAYMENT_STORE.with(|store| store.borrow().clone());
//     let icp_ledger = ICP_LEDGER_ID.with(|id| id.borrow().clone());
//     let ckbtc_ledger = CKBTC_LEDGER_ID.with(|id| id.borrow().clone());
    
//     storage::stable_save((payment_store, icp_ledger, ckbtc_ledger))
//         .expect("Failed to save state");
// }

// #[post_upgrade]
// fn post_upgrade() {
//     let (payment_store, icp_ledger, ckbtc_ledger): (
//         HashMap<String, Payment>,
//         Principal,
//         Principal,
//     ) = storage::stable_restore().expect("Failed to restore state");

//     PAYMENT_STORE.with(|store| *store.borrow_mut() = payment_store);
//     ICP_LEDGER_ID.with(|id| *id.borrow_mut() = icp_ledger);
//     CKBTC_LEDGER_ID.with(|id| *id.borrow_mut() = ckbtc_ledger);
// }
