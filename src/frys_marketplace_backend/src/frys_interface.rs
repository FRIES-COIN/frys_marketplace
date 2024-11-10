use candid::Principal;
use ic_cdk::api::call::RejectionCode;

const FRYS_CANISTER_ID: &str = "ezu5v-7qaaa-aaaam-acpbq-cai";

#[derive(candid::CandidType, serde::Deserialize)]
struct TransferArgs {
    to: Principal,
    amount: u64,
}

pub async fn verify_and_lock_frys(caller: Principal, amount: u64) -> Result<(), String> {
    let balance: Result<(u64,), (RejectionCode, String)> = ic_cdk::call(
        Principal::from_text(FRYS_CANISTER_ID).unwrap(),
        "balance_of",
        (caller,)
    ).await;

    let balance = match balance {
        Ok((bal,)) => bal,
        Err((code, msg)) => return Err(format!("Failed to check FRYS balance: {:?} - {}", code, msg))
    };

    if balance < amount {
        return Err("Insufficient FRYS balance".to_string());
    }

    let transfer_args = TransferArgs {
        to: ic_cdk::id(),
        amount,
    };

    let transfer_result: Result<(), (RejectionCode, String)> = ic_cdk::call(
        Principal::from_text(FRYS_CANISTER_ID).unwrap(),
        "transfer",
        (transfer_args,)
    ).await;

    match transfer_result {
        Ok(()) => Ok(()),
        Err((code, msg)) => Err(format!("Failed to lock FRYS tokens: {:?} - {}", code, msg))
    }
}

pub async fn unlock_frys(to: Principal, amount: u64) -> Result<(), String> {
    let transfer_args = TransferArgs {
        to,
        amount,
    };

    let result: Result<(), (RejectionCode, String)> = ic_cdk::call(
        Principal::from_text(FRYS_CANISTER_ID).unwrap(),
        "transfer",
        (transfer_args,)
    ).await;

    match result {
        Ok(()) => Ok(()),
        Err((code, msg)) => Err(format!("Failed to unlock FRYS tokens: {:?} - {}", code, msg))
    }
}
