use candid::{CandidType, Nat, Principal};
use ic_cdk::{api::call, storage, caller, update, query, heartbeat};
use icrc_ledger_types::{
    icrc1::transfer::{TransferArg, TransferError},
    icrc1::account::Account,
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

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub enum TokenType {
    FRYS,
    ICP,
    CKBTC,
}

#[derive(CandidType, Deserialize, Serialize, Clone)]
pub struct PendingTransfer {
    id: String,
    amount: u64,
    from: Principal,
    to: Principal,
    timestamp: u64,
    token_type: TokenType,
    retries: u32,
}

thread_local! {
    pub static PAYMENT_STORE: RefCell<HashMap<String, Payment>> = RefCell::new(HashMap::new());
    pub static PENDING_TRANSFERS: RefCell<HashMap<String, PendingTransfer>> = RefCell::new(HashMap::new());
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

async fn get_canister_balance(token_type: &TokenType) -> Result<Nat, String> {
    match token_type {
        TokenType::ICP => {
            let account = ic_cdk::api::id().to_text();
            
            match call::call::<(String,), (u64,)>(
                ICP_LEDGER_ID.with(|id| id.borrow().clone()),
                "account_balance",
                (account,)
            ).await {
                Ok((balance,)) => Ok(Nat::from(balance)),
                Err(e) => Err(format!("Balance check failed: {:?}", e))
            }
        },
        TokenType::CKBTC | TokenType::FRYS => {
            // Keep existing ICRC1 implementation for these tokens
            let account = Account {
                owner: ic_cdk::api::id(),
                subaccount: None,
            };
            
            match call::call::<(Account,), (Nat,)>(
                get_ledger_id(token_type),
                "icrc1_balance_of",
                (account,)
            ).await {
                Ok((balance,)) => Ok(balance),
                Err(e) => Err(format!("Balance check failed: {:?}", e))
            }
        }
    }
}async fn complete_transfer(transfer: &PendingTransfer) -> Result<Nat, String> {
    // Check canister balance first
    let balance = get_canister_balance(&transfer.token_type).await?;
    let required_amount = transfer.amount + 10000; // Adding standard fee amount
    
    if balance < Nat::from(required_amount) {
        return Err(format!("Insufficient balance including fee. Have: {}, Need: {}", balance, required_amount));
    }

    let ledger_id = match transfer.token_type {
        TokenType::ICP => ICP_LEDGER_ID.with(|id| id.borrow().clone()),
        TokenType::CKBTC => CKBTC_LEDGER_ID.with(|id| id.borrow().clone()),
        TokenType::FRYS => FRYS_LEDGER_ID.with(|id| id.borrow().clone()),
    };

    let transfer_args = TransferArg {
        from_subaccount: None,
        to: Account {
            owner: transfer.to,
            subaccount: None,
        },
        amount: Nat::from(transfer.amount),
        fee: Some(Nat::from(10000u64)), // Explicit fee specification
        memo: None,
        created_at_time: None,
    };

    match call::call::<(TransferArg,), (Result<Nat, TransferError>,)>(
        ledger_id,
        "icrc1_transfer",
        (transfer_args,),
    ).await {
        Ok((Ok(block_height),)) => Ok(block_height),
        Ok((Err(e),)) => Err(format!("Transfer error: {:?}", e)),
        Err(e) => Err(format!("Call error: {:?}", e)),
    }
}

#[update]
async fn payment(id: String, price: f64, token_type: TokenType) -> String {
    let amount_in_e8s = (price * 100_000_000.0) as u64;
    let destination = Principal::from_text("mdpn6-pyg7q-bwfjn-cxmnr-cciq7-7aqig-kxkt7-bk2ps-nzuqn-mst5t-hqe").unwrap();
    
    let pending_transfer = PendingTransfer {
        id: id.clone(),
        amount: amount_in_e8s,
        from: caller(),
        to: destination,
        timestamp: ic_cdk::api::time(),
        token_type: token_type.clone(),
        retries: 0,
    };
    
    PENDING_TRANSFERS.with(|transfers| {
        transfers.borrow_mut().insert(id.clone(), pending_transfer.clone())
    });

    match complete_transfer(&pending_transfer).await {
        Ok(block_height) => {
            let payment = Payment {
                id: id.clone(),
                block_height,
                amount: price,
                payer: caller().to_string(),
                token_type,
            };
            
            PAYMENT_STORE.with(|store| store.borrow_mut().insert(id.clone(), payment.clone()));
            PENDING_TRANSFERS.with(|transfers| transfers.borrow_mut().remove(&id));
            
            serde_json::to_string(&payment).unwrap()
        },
        Err(error) => {
            serde_json::to_string(&json!({
                "error": error,
                "pending_id": id
            })).unwrap()
        }
    }
}

#[heartbeat]
async fn process_pending_transfers() {
    let pending = PENDING_TRANSFERS.with(|transfers| transfers.borrow().clone());

    for (id, mut transfer) in pending {
        if transfer.retries < 3 && ic_cdk::api::time() - transfer.timestamp > 300_000_000_000 {
            match complete_transfer(&transfer).await {
                Ok(block_height) => {
                    let payment = Payment {
                        id: id.clone(),
                        block_height,
                        amount: (transfer.amount as f64) / 100_000_000.0,
                        payer: transfer.from.to_string(),
                        token_type: transfer.token_type,
                    };
                    
                    PAYMENT_STORE.with(|store| store.borrow_mut().insert(id.clone(), payment));
                    PENDING_TRANSFERS.with(|transfers| transfers.borrow_mut().remove(&id));
                },
                Err(_) => {
                    transfer.retries += 1;
                    if transfer.retries >= 3 {
                        // Log failed transfer for manual recovery
                        PENDING_TRANSFERS.with(|transfers| transfers.borrow_mut().remove(&id));
                    } else {
                        PENDING_TRANSFERS.with(|transfers| {
                            transfers.borrow_mut().insert(id.clone(), transfer.clone())
                        });
                    }
                }
            }
        }
    }
}

#[query]
fn get_pending_transfers() -> Vec<PendingTransfer> {
    PENDING_TRANSFERS.with(|transfers| transfers.borrow().values().cloned().collect())
}

#[query]
fn get_payment_history() -> Vec<Payment> {
    PAYMENT_STORE.with(|store| store.borrow().values().cloned().collect())
}

#[query]
async fn get_canister_icp_balance() -> String {
    match get_canister_balance(&TokenType::ICP).await {
        Ok(balance) => format!("Balance: {}", balance),
        Err(e) => format!("Error: {}", e)
    }
}

fn get_ledger_id(token_type: &TokenType) -> Principal {
    match token_type {
        TokenType::ICP => ICP_LEDGER_ID.with(|id| id.borrow().clone()),
        TokenType::CKBTC => CKBTC_LEDGER_ID.with(|id| id.borrow().clone()),
        TokenType::FRYS => FRYS_LEDGER_ID.with(|id| id.borrow().clone()),
    }
}
