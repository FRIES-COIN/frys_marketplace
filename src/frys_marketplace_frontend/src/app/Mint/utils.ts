import type { MintRequest } from '../../declarations/frys_marketplace_backend';
import { mintService } from './mint-service';

export const validateMintRequest = (request: MintRequest): string | null => {
  if (!request.frys_amount || request.frys_amount < BigInt(1000)) {
    return 'Minimum FRYS amount required: 1000';
  }

  if (!request.metadata.collection_name) {
    return 'Collection name is required';
  }

  if (!request.metadata.description) {
    return 'Description is required';
  }

  if (!request.metadata.price || request.metadata.price <= 0) {
    return 'Invalid price';
  }

  return null;
};

export const formatMintError = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred during minting';
};

export const checkMintingStatus = async (inscriptionId: bigint): Promise<boolean> => {
  try {
    const actor = await mintService.initialize();
    const inscription = await actor.get_inscription(inscriptionId);
    return inscription.length > 0;
  } catch (error) {
    console.error('Error checking minting status:', error);
    return false;
  }
};

export const waitForMintingConfirmation = async (
  inscriptionId: bigint,
  maxAttempts = 10,
  interval = 2000
): Promise<boolean> => {
  for (let i = 0; i < maxAttempts; i++) {
    const isConfirmed = await checkMintingStatus(inscriptionId);
    if (isConfirmed) return true;
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  return false;
};
