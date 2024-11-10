use candid::Principal;
use ic_cdk::api::time;
use ic_cdk_macros::*;
use sha2::{Sha256, Digest};

use crate::{
    state::{STATE, State},
    types::*,
    frys_interface::verify_and_lock_frys,
};

const RARITY_WEIGHTS: [(u64, f64); 4] = [
    (1000000, 0.4),  // sat_point weight
    (100000, 0.3),   // frys_amount weight
    (10000, 0.2),    // generation weight
    (1000, 0.1),     // timestamp weight
];

// Add constants for ordinal calculations
const SAT_POINT_MODULUS: u64 = 100_000_000; // 100M sats per coin
const MIN_FRYS_AMOUNT: u64 = 1_000; // Minimum FRYS tokens required for minting

#[update]
pub async fn mint_inscription(request: MintRequest) -> Result<MintResponse, String> {
    let caller = ic_cdk::caller();

    // Validate minimum FRYS amount
    if request.frys_amount < MIN_FRYS_AMOUNT {
        return Err(format!("Minimum FRYS amount required: {}", MIN_FRYS_AMOUNT));
    }

    // Verify and lock FRYS tokens
    verify_and_lock_frys(caller, request.frys_amount).await?;

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let id = state.next_inscription_id;
        state.next_inscription_id += 1;

        // Enhanced sat_point calculation
        let sat_point = calculate_sat_point(&request, id);

        // Validate sat_point uniqueness
        if state.is_sat_point_taken(sat_point) {
            return Err("Sat point collision detected. Please try again.".to_string());
        }

        // Calculate generation based on collection stats
        let generation = calculate_generation(&state, &request.metadata.collection_name);

        // Calculate rarity score with improved algorithm
        let rarity_score = calculate_rarity_score(sat_point, request.frys_amount, generation);

        let timestamp = time();

        // Create inscription
        let inscription = Inscription {
            id,
            content_type: request.content_type,
            data: request.data,
            metadata: request.metadata.clone(),
            owner: caller,
            timestamp,
            frys_amount: request.frys_amount,
            sat_point,
            transfer_history: vec![TransferRecord {
                from: Principal::anonymous(),
                to: caller,
                timestamp,
                price: None,
                transaction_type: TransactionType::Mint,
            }],
            status: InscriptionStatus::Active,
            rarity_score,
            generation,
        };

        // Update collection stats
        state.update_collection_stats(&inscription.metadata.collection_name);

        // Store inscription
        state.add_inscription(inscription);

        Ok(MintResponse {
            inscription_id: id,
            sat_point,
            rarity_score,
            timestamp,
        })
    })
}

#[update]
pub async fn mint_batch(request: MintBatchRequest) -> Result<Vec<MintResponse>, String> {
    let caller = ic_cdk::caller();

    // Verify total FRYS amount
    if request.requests.iter().map(|r| r.frys_amount).sum::<u64>() != request.total_frys_amount {
        return Err("Total FRYS amount mismatch".to_string());
    }

    // Verify and lock total FRYS tokens
    verify_and_lock_frys(caller, request.total_frys_amount).await?;

    let mut responses = Vec::new();

    STATE.with(|state| {
        let mut state = state.borrow_mut();

        for req in request.requests {
            let id = state.next_inscription_id;
            state.next_inscription_id += 1;

            let sat_point = calculate_sat_point(&req, id);
            let generation = calculate_generation(&state, &req.metadata.collection_name);
            let rarity_score = calculate_rarity_score(sat_point, req.frys_amount, generation);
            let timestamp = time();

            let inscription = Inscription {
                id,
                content_type: req.content_type,
                data: req.data,
                metadata: req.metadata,
                owner: caller,
                timestamp,
                frys_amount: req.frys_amount,
                sat_point,
                transfer_history: vec![TransferRecord {
                    from: Principal::anonymous(),
                    to: caller,
                    timestamp,
                    price: None,
                    transaction_type: TransactionType::Mint,
                }],
                status: InscriptionStatus::Active,
                rarity_score,
                generation,
            };

            state.add_inscription(inscription);

            responses.push(MintResponse {
                inscription_id: id,
                sat_point,
                rarity_score,
                timestamp,
            });
        }
    });

    Ok(responses)
}

fn calculate_sat_point(request: &MintRequest, id: u64) -> u64 {
    let mut hasher = Sha256::new();

    // Enhanced sat_point calculation with more entropy sources
    hasher.update(format!(
        "{}:{}:{}:{}:{}:{}",
        id,
        time(),
        request.frys_amount,
        request.metadata.collection_name,
        request.metadata.creation_number,
        request.metadata.media_hash // Include media hash for additional uniqueness
    ));

    // Generate sat_point within valid range
    let hash_bytes = hasher.finalize();
    let raw_value = u64::from_be_bytes(hash_bytes[..8].try_into().unwrap());
    raw_value % SAT_POINT_MODULUS
}

fn calculate_generation(state: &State, collection_name: &str) -> u64 {
    match state.collections.get(collection_name) {
        Some(collection) => collection.inscription_count + 1,
        None => 1,
    }
}

fn calculate_rarity_score(sat_point: u64, frys_amount: u64, generation: u64) -> f64 {
    let mut score = 0.0;

    // Improved rarity calculation with normalized weights
    for (factor, weight) in RARITY_WEIGHTS.iter() {
        score += match factor {
            1000000 => (sat_point as f64 / SAT_POINT_MODULUS as f64) * weight,
            100000 => (frys_amount as f64).log10() / 10.0 * weight,
            10000 => (1.0 / (generation as f64).sqrt()) * weight,
            1000 => (1.0 / (time() as f64).log10()) * weight,
            _ => 0.0,
        };
    }

    // Normalize final score to 0-1 range
    score.min(1.0).max(0.0)
}

// Query functions
#[query]
pub fn get_inscription(id: u64) -> Option<Inscription> {
    STATE.with(|state| state.borrow().get_inscription(id))
}

#[query]
pub fn get_user_inscriptions(user: Principal) -> Vec<Inscription> {
    STATE.with(|state| state.borrow().get_user_inscriptions(user))
}

#[query]
pub fn get_rarest_inscriptions(limit: usize) -> Vec<Inscription> {
    STATE.with(|state| state.borrow().get_rarest_inscriptions(limit))
}

#[query]
pub fn get_inscriptions_by_sat_range(start: u64, end: u64) -> Vec<Inscription> {
    STATE.with(|state| state.borrow().get_inscriptions_by_sat_range(start, end))
}

#[query]
pub fn get_inscriptions_by_generation(generation: u64) -> Vec<Inscription> {
    STATE.with(|state| state.borrow().get_inscriptions_by_generation(generation))
}
