use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Inscription {
    pub id: u64,
    pub content_type: String,
    pub data: String,
    pub metadata: InscriptionMetadata,
    pub owner: Principal,
    pub timestamp: u64,
    pub frys_amount: u64,
    pub sat_point: u64,
    pub transfer_history: Vec<TransferRecord>,
    pub status: InscriptionStatus,
    pub rarity_score: f64,
    pub generation: u64,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct InscriptionMetadata {
    pub name: String,
    pub description: String,
    pub collection_name: String,
    pub attributes: Vec<(String, String)>,
    pub price: f64,
    pub creator: Principal,
    pub creation_number: u64,
    pub media_hash: String,
    pub external_url: Option<String>,
    pub license: Option<String>,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub enum InscriptionStatus {
    Active,
    Listed,
    Locked,
    Burned,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct TransferRecord {
    pub from: Principal,
    pub to: Principal,
    pub timestamp: u64,
    pub price: Option<u64>,
    pub transaction_type: TransactionType,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub enum TransactionType {
    Mint,
    Transfer,
    List,
    Unlist,
    Sale,
    Lock,
    Unlock,
    Burn,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Collection {
    pub name: String,
    pub description: String,
    pub creator: Principal,
    pub inscription_count: u64,
    pub floor_price: Option<u64>,
    pub total_volume: u64,
    pub verified: bool,
    pub creation_time: u64,
    pub metadata: CollectionMetadata,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct CollectionMetadata {
    pub banner_image: Option<String>,
    pub profile_image: Option<String>,
    pub website: Option<String>,
    pub social_links: Vec<(String, String)>,
    pub category: String,
    pub royalty_percentage: f64,
}

impl Default for CollectionMetadata {
    fn default() -> Self {
        Self {
            banner_image: None,
            profile_image: None,
            website: None,
            social_links: Vec::new(),
            category: "Unknown".to_string(),
            royalty_percentage: 0.0,
        }
    }
}

#[derive(CandidType, Serialize, Deserialize, Debug, Clone)]
pub struct MintRequest {
    pub content_type: String,
    pub data: String,
    pub metadata: InscriptionMetadata,
    pub frys_amount: u64,
}

#[derive(CandidType, Serialize, Deserialize, Debug)]
pub struct MintBatchRequest {
    pub requests: Vec<MintRequest>,
    pub total_frys_amount: u64,
}

#[derive(CandidType, Serialize, Deserialize, Debug)]
pub struct MintResponse {
    pub inscription_id: u64,
    pub sat_point: u64,
    pub rarity_score: f64,
    pub timestamp: u64,
}

#[derive(CandidType, Serialize, Deserialize, Debug)]
pub struct SystemStats {
    pub total_inscriptions: u64,
    pub total_frys_locked: u64,
    pub total_collections: u64,
}