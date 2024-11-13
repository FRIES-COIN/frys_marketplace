use candid::Principal;
use ic_cdk::api::time;
use crate::state::STATE;
use crate::types::{MintRequest, MintResponse, Inscription, InscriptionStatus, TransferRecord, TransactionType};

pub async fn mint_inscription(request: MintRequest) -> Result<MintResponse, String> {
    let caller = ic_cdk::caller();
    let timestamp = time();

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let id = state.next_inscription_id;
        state.next_inscription_id += 1;

        // Calculate sat point and rarity score
        let sat_point = state.calculate_sat_point(&request);
        let rarity_score = state.calculate_rarity_score(&request);
        let generation = state.current_generation();

        // Create inscription
        let inscription = Inscription {
            id,
            content_type: request.content_type,
            data: request.data,
            metadata: request.metadata,
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