import { Principal } from '@dfinity/principal';
import type { ActorSubclass } from '@dfinity/agent';
import type { _SERVICE } from '../../declarations/frys_marketplace_backend/frys_marketplace_backend.did.d';
import { createActor } from '../../declarations/frys_marketplace_backend';
import { MintRequest, MintResponse } from '../../declarations/frys_marketplace_backend';
import { formatMintError } from './utils';

export class MintService {
  private static instance: MintService;
  private actor: ActorSubclass<_SERVICE> | null = null;

  private constructor() {}

  public static getInstance(): MintService {
    if (!MintService.instance) {
      MintService.instance = new MintService();
    }
    return MintService.instance;
  }

  async initialize(): Promise<ActorSubclass<_SERVICE>> {
    if (!this.actor) {
      const canisterId = import.meta.env.VITE_CANISTER_ID_FRYS_MARKETPLACE_BACKEND;
      if (!canisterId) {
        throw new Error('Backend canister ID not found in environment variables');
      }
      this.actor = await createActor(canisterId);
    }
    return this.actor;
  }

  async mintInscription(request: MintRequest): Promise<MintResponse> {
    try {
      const actor = await this.initialize();

      // Verify FRYS balance before minting
      const balance = await actor.get_frys_balance(await window.ic.plug.getPrincipal());
      if (balance < request.frys_amount) {
        throw new Error(`Insufficient FRYS balance. Required: ${request.frys_amount}, Available: ${balance}`);
      }

      const result = await actor.mint_inscription(request);

      if ('Ok' in result) {
        // Update local cache if needed
        this.updateLocalCache(result.Ok);
        return result.Ok;
      } else {
        throw new Error(result.Err);
      }
    } catch (error) {
      console.error('Minting error:', error);
      throw new Error(formatMintError(error));
    }
  }

  private updateLocalCache(mintResponse: MintResponse) {
    // Implement local cache update logic if needed
    // This can help with optimistic updates
  }

  async mintBatch(requests: MintRequest[], totalFrysAmount: bigint) {
    try {
      const actor = await this.initialize();
      const result = await actor.mint_batch({
        requests,
        total_frys_amount: totalFrysAmount
      });

      if ('Ok' in result) {
        return result.Ok;
      } else {
        throw new Error(result.Err);
      }
    } catch (error) {
      console.error('Batch minting error:', error);
      throw error;
    }
  }
}

export const mintService = MintService.getInstance();
