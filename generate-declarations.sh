#!/bin/bash

# Generate Candid interface
dfx generate frys_marketplace_backend

# Copy declarations to frontend
mkdir -p src/frys_marketplace_frontend/src/declarations
cp -r .dfx/local/canisters/frys_marketplace_backend/* src/frys_marketplace_frontend/src/declarations/frys_marketplace_backend/
