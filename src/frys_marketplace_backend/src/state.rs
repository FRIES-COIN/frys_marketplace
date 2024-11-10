use std::collections::HashMap;
use candid::Principal;
use ic_cdk::api::time;
use std::cell::RefCell;
use crate::types::*;

thread_local! {
    pub static STATE: RefCell<State> = RefCell::new(State::default());
}

#[derive(Default)]
pub struct State {
    pub next_inscription_id: u64,
    pub inscriptions: HashMap<u64, Inscription>,
    pub collections: HashMap<String, Collection>,
}

impl State {
    pub fn add_inscription(&mut self, inscription: Inscription) {
        self.inscriptions.insert(inscription.id, inscription);
    }

    pub fn get_inscription(&self, id: u64) -> Option<Inscription> {
        self.inscriptions.get(&id).cloned()
    }

    pub fn get_user_inscriptions(&self, user: Principal) -> Vec<Inscription> {
        self.inscriptions
            .values()
            .filter(|i| i.owner == user)
            .cloned()
            .collect()
    }

    pub fn get_rarest_inscriptions(&self, limit: usize) -> Vec<Inscription> {
        let mut inscriptions: Vec<_> = self.inscriptions.values().cloned().collect();
        inscriptions.sort_by(|a, b| b.rarity_score.partial_cmp(&a.rarity_score).unwrap());
        inscriptions.truncate(limit);
        inscriptions
    }

    pub fn get_inscriptions_by_sat_range(&self, start: u64, end: u64) -> Vec<Inscription> {
        self.inscriptions
            .values()
            .filter(|i| i.sat_point >= start && i.sat_point <= end)
            .cloned()
            .collect()
    }

    pub fn get_inscriptions_by_generation(&self, generation: u64) -> Vec<Inscription> {
        self.inscriptions
            .values()
            .filter(|i| i.generation == generation)
            .cloned()
            .collect()
    }

    pub fn total_frys_locked(&self) -> u64 {
        self.inscriptions
            .values()
            .map(|i| i.frys_amount)
            .sum()
    }

    pub fn is_sat_point_taken(&self, sat_point: u64) -> bool {
        self.inscriptions
            .values()
            .any(|i| i.sat_point == sat_point)
    }

    pub fn update_collection_stats(&mut self, collection_name: &str) {
        if let Some(collection) = self.collections.get_mut(collection_name) {
            collection.inscription_count += 1;
        } else {
            let collection = Collection {
                name: collection_name.to_string(),
                description: String::new(),
                creator: ic_cdk::caller(),
                inscription_count: 1,
                floor_price: None,
                total_volume: 0,
                verified: false,
                creation_time: time(),
                metadata: CollectionMetadata::default(),
            };
            self.collections.insert(collection_name.to_string(), collection);
        }
    }
}
