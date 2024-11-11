use candid::Principal;
use ic_cdk::api::call::RejectionCode;

const FRYS_CANISTER_ID: &str = "ezu5v-7qaaa-aaaam-acpbq-cai";

#[derive(candid::CandidType, serde::Deserialize)]
struct TransferFromArgs {
    spender: Principal,
    from: Principal,
    to: Principal,
    amount: u64,
}

#[derive(candid::CandidType, serde::Deserialize)]
struct Allowance {
    owner: Principal,
    spender: Principal,
}

pub async fn verify_and_lock_frys(caller: Principal, amount: u64) -> Result<(), String> {
    // First check if user has approved enough tokens
    let allowance = check_allowance(caller).await?;
    if allowance < amount {
        return Err("Insufficient allowance. Please approve more tokens.".to_string());
    }

    // Then check balance
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

    let transfer_args = TransferFromArgs {
        spender: ic_cdk::id(),
        from: caller,
        to: ic_cdk::id(),
        amount,
    };

    let transfer_result: Result<(), (RejectionCode, String)> = ic_cdk::call(
        Principal::from_text(FRYS_CANISTER_ID).unwrap(),
        "icrc2_transfer_from",
        (transfer_args,)
    ).await;

    match transfer_result {
        Ok(()) => Ok(()),
        Err((code, msg)) => Err(format!("Failed to lock FRYS tokens: {:?} - {}", code, msg))
    }
}

pub async fn unlock_frys(to: Principal, amount: u64) -> Result<(), String> {
    let transfer_args = TransferFromArgs {
        spender: ic_cdk::id(),
        from: ic_cdk::id(),
        to,
        amount,
    };

    let result: Result<(), (RejectionCode, String)> = ic_cdk::call(
        Principal::from_text(FRYS_CANISTER_ID).unwrap(),
        "icrc2_transfer_from",
        (transfer_args,)
    ).await;

    match result {
        Ok(()) => Ok(()),
        Err((code, msg)) => Err(format!("Failed to unlock FRYS tokens: {:?} - {}", code, msg))
    }
}

pub async fn check_allowance(owner: Principal) -> Result<u64, String> {
    let allowance_args = Allowance {
        owner,
        spender: ic_cdk::id(),
    };

    let allowance: Result<(u64,), (RejectionCode, String)> = ic_cdk::call(
        Principal::from_text(FRYS_CANISTER_ID).unwrap(),
        "icrc2_allowance",
        (allowance_args,)
    ).await;

    match allowance {
        Ok((amount,)) => Ok(amount),
        Err((code, msg)) => Err(format!("Failed to check allowance: {:?} - {}", code, msg))
    }
}
