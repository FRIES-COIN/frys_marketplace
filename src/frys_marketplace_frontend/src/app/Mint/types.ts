import { Principal } from '@dfinity/principal';

export interface MintFormData {
  collectionName: string;
  description: string;
  price: number;
  frysAmount: number;
  contentType: string;
}

export interface MintResult {
  success: boolean;
  inscriptionId?: bigint;
  error?: string;
}

export interface MintingState {
  isLoading: boolean;
  error: string | null;
  lastMintedId: bigint | null;
}
