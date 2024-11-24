use std::cell::RefCell;
use std::collections::HashMap;
use candid::Principal;
use crate::types::*;

thread_local! {
    pub static STATE: RefCell<State> = RefCell::new(State::default());
}

pub struct State {
    pub next_inscription_id: u64,
    pub inscriptions: HashMap<u64, Inscription>,
    pub collections: HashMap<String, Collection>,
    pub current_generation: u64,
}

impl State {
    pub fn calculate_sat_point(&self, _request: &MintRequest) -> u64 {
        // Simple implementation - can be made more complex
        (self.next_inscription_id + 1) * 100_000
    }

    pub fn calculate_rarity_score(&self, request: &MintRequest) -> f64 {
        // Simple implementation - can be enhanced based on attributes
        let base_score = 1.0;
        let collection_bonus = if self.collections.contains_key(&request.metadata.collection_name) {
            0.5
        } else {
            0.0
        };
        base_score + collection_bonus
    }

    pub fn current_generation(&self) -> u64 {
        self.current_generation
    }

    pub fn add_inscription(&mut self, inscription: Inscription) {
        self.inscriptions.insert(inscription.id, inscription);
    }

    pub fn update_collection_stats(&mut self, collection_name: &str) {
        if let Some(collection) = self.collections.get_mut(collection_name) {
            collection.inscription_count += 1;
        } else {
            // Create new collection if it doesn't exist
            let collection = Collection {
                name: collection_name.to_string(),
                description: String::new(),
                creator: Principal::anonymous(),
                inscription_count: 1,
                floor_price: None,
                total_volume: 0,
                verified: false,
                creation_time: ic_cdk::api::time(),
                metadata: CollectionMetadata::default(),
            };
            self.collections.insert(collection_name.to_string(), collection);
        }
    }

    pub fn total_frys_locked(&self) -> u64 {
        self.inscriptions.values()
            .map(|inscription| inscription.frys_amount)
            .sum()
    }
}

impl Default for State {
    fn default() -> Self {
        Self {
            next_inscription_id: 0,
            inscriptions: HashMap::new(),
            collections: HashMap::new(),
            current_generation: 0,
        }
    }
}