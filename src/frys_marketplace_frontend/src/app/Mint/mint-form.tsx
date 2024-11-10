import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { mintService } from './mint-service';
import { toast } from 'react-hot-toast';
import { validateMintRequest } from './utils';

interface MintFormProps {
  onMint?: (response: MintResponse) => void;
}

// Add interfaces to match backend types
interface MintRequest {
  content_type: string;
  data: string;
  metadata: InscriptionMetadata;
  frys_amount: bigint;
}

interface InscriptionMetadata {
  name: string;
  description: string;
  collection_name: string;
  attributes: [string, string][];
  price: number;
  creator: Principal;
  creation_number: bigint;
  media_hash: string;
  external_url?: string;
  license?: string;
}

interface MintResponse {
  inscription_id: bigint;
  sat_point: bigint;
  rarity_score: number;
  timestamp: bigint;
}

declare global {
  interface Window {
    ic: {
      plug: {
        requestConnect: () => Promise<boolean>;
        isConnected: () => Promise<boolean>;
        createAgent: (args?: any) => Promise<void>;
        requestBalance: () => Promise<Array<{ amount: number; symbol: string; }>>;
        requestTransfer: (arg: any) => Promise<any>;
        agent: any;
        getPrincipal: () => Promise<Principal>;
      };
    };
  }
}

const MintForm: React.FC<MintFormProps> = ({ onMint }) => {
  const [collectionName, setCollectionName] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [frysAmount, setFrysAmount] = useState<number>(1000); // Default to MIN_FRYS_AMOUNT
  const [contentType, setContentType] = useState("image/jpeg");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const principal = await window.ic.plug.getPrincipal();
      const mintRequest: MintRequest = {
        content_type: contentType || "text/plain",
        data: imageDescription || "",
        metadata: {
          name: `${collectionName} #${Date.now()}`,
          description: imageDescription || "",
          collection_name: collectionName || "",
          attributes: [],
          price: Number(price) || 0,
          creator: principal,
          creation_number: BigInt(Date.now()),
          media_hash: crypto.randomUUID(),
          external_url: undefined,
          license: undefined
        },
        frys_amount: BigInt(frysAmount || 0)
      };

      // Validate request before sending
      const validationError = validateMintRequest(mintRequest);
      if (validationError) {
        throw new Error(validationError);
      }

      const response = await mintService.mintInscription(mintRequest);
      toast.success(`NFT Minted Successfully!\nInscription ID: ${response.inscription_id}\nSat Point: ${response.sat_point}`);
      onMint?.(response);
    } catch (err: any) {
      console.error(err);
      toast.error(`Error minting NFT: ${err?.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-start">
      <section className="w-full max-w-[32rem] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-42 font-body text-gray-300">
          Create NFT
        </h1>
        <p className="text-base md:text-lg mb-4 font-title text-gray-400">
          Mint your NFT to the blockchain
        </p>

        <div className="mb-6">
          <label
            htmlFor="collectionName"
            className="block text-sm font-medium text-gray-300 font-body mb-2"
          >
            Collection Name
          </label>
          <input
            id="collectionName"
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[42px] font-body text-white"
            required
            placeholder="Enter collection name"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="imageDescription"
            className="block text-sm font-medium text-gray-300 font-body mb-2"
          >
            Image Description
          </label>
          <textarea
            id="imageDescription"
            rows={3}
            value={imageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[22px] font-body text-white"
            required
            placeholder="What's your NFT about?"
          ></textarea>
        </div>

        <div className="mb-8">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300 font-body mb-2"
          >
            Price (in ICP)
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[42px] font-body text-white"
            required
            placeholder="Enter price"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="frysAmount" className="block text-sm font-medium text-gray-300 font-body mb-2">
            FRYS Amount (min: 1000)
          </label>
          <input
            id="frysAmount"
            type="number"
            min={1000}
            value={frysAmount}
            onChange={(e) => setFrysAmount(Math.max(1000, parseInt(e.target.value)))}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[42px] font-body text-white"
            required
            placeholder="Enter FRYS amount"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="contentType" className="block text-sm font-medium text-gray-300 font-body mb-2">
            Content Type
          </label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[42px] font-body text-white"
          >
            <option value="image/jpeg">JPEG Image</option>
            <option value="image/png">PNG Image</option>
            <option value="image/gif">GIF Image</option>
            <option value="text/plain">Text</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-lg font-bold ${
            isLoading ? 'bg-gray-400' : 'bg-primary'
          } text-black`}
        >
          {isLoading ? 'Minting...' : 'Create NFT'}
        </button>
      </section>
    </form>
  );
};

export default MintForm;
