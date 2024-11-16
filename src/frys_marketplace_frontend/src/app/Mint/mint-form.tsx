import React, { useEffect, useState } from "react";
import { createActor } from "../../../../declarations/frys_marketplace_backend";
import { createActor as createFRYSTokenActor } from "../../../../declarations/frys_token";
import { connectPlug, getConnectedWalletAgent, getPrincipalID } from "../Wallet/wallet-service";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc"; 
import { Principal } from "@dfinity/principal";

const frysBackendCanisterID = "ia5ie-kqaaa-aaaal-arqqa-cai";
const frysTokenCanisterID = "ezu5v-7qaaa-aaaam-acpbq-cai";

interface MintFormProps {
  imageBytes: number[][];
}

const MintForm: React.FC<MintFormProps> = ({ imageBytes }) => {
  const [collectionName, setCollectionName] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [collections, setCollections] = useState<Array<{id: bigint, name: string}>>([]);
  const [collectionId, setCollectionId] = useState<string>("");

  const transferFRYSTokens = async (amount: number, sessionAgent: any, actor: any) => {
    try {
      
      // const params = {
      //   to: frysBackendCanisterID,
      //   strAmount: '0.01',
      //   token: frysTokenCanisterID
      // };

      // const result = await window.ic.plug.requestTokenTransfer(params);

      // console.log("Transfer successful at block height:", result);

      // const ledger = IcrcLedgerCanister.create({
      //   agent: sessionAgent,
      //   canisterId: Principal.fromText(frysTokenCanisterID) as any,
      // });
      // console.log("Ledger created:", ledger);

      // const amountE8s = BigInt(Math.floor(Number(amount) * 100000000));

      // const result = await ledger.transfer({
      //   to: {
      //     owner: Principal.fromText(frysTokenCanisterID) as any,
      //     subaccount: []
      //   },
      //   amount: amountE8s,
      //   fee: BigInt(0),
      //   memo: new Uint8Array([]),
      //   created_at_time: BigInt(Date.now()) * BigInt(1000000)
      // });

      // console.log("Transfer successful at block height:", result);

      // Using hardocoded values for testing
      const hardcodedresult = 1234567890;

      const verificationResult = await actor.verify_frys_payment(
        BigInt(hardcodedresult),
        BigInt(amount)
      );
      console.log("Verification result:", verificationResult);

      console.log("Transfer verified:", verificationResult);
      return hardcodedresult;

    } catch (error) {
      console.error("Failed to transfer FRYS tokens:", error);
      setError('Failed to transfer FRYS tokens');
      throw error;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!collectionId) {
      setError("Please select a collection");
      setIsLoading(false);
      return;
    }

    if (price === undefined) {
      setError("Please enter a price");
      setIsLoading(false);
      return;
    }

    try {
      const connected = await connectPlug();
      if (!connected) {
        setError('Please connect your wallet first');
        return;
      }

      const sessionAgent = await getConnectedWalletAgent();
      const actor = createActor(frysBackendCanisterID, sessionAgent);

      // Transfer 10 FRYS tokens first
      const frysAmount = 10;
      const transferResult = await transferFRYSTokens(frysAmount, sessionAgent, actor);
      console.log("FRYS transfer successful at block height:", transferResult);
      
      // Mint NFT with selected collection ID
      const mintResult = await actor.mint_nft(
        imageBytes,
        BigInt(collectionId), 
        imageDescription,
        BigInt(price! * 1e8)
      );

      console.log("Mint Result:", mintResult);
      setSuccess(`NFT minted successfully! Collection ID: ${collectionId}`);
      
      // Reset form
      setCollectionId("");
      setImageDescription("");
      setPrice(undefined);

    } catch (err) {
      console.error("Error:", err); 
      setError(`Minting failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };


  // Add this useEffect to fetch collections when component mounts
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const sessionAgent = await getConnectedWalletAgent();
        const actor = createActor(frysBackendCanisterID, {
          agent: sessionAgent
        });
        const allCollections = await actor.get_all_collections();
        setCollections(allCollections);
      } catch (err) {
        console.error("Failed to fetch collections:", err);
      }
    };
    fetchCollections();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-start">
      <section className="w-full max-w-[32rem] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-42 font-body text-gray-300">
          Create NFT
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500">
            {success}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="collection" className="block text-sm font-medium text-gray-300 font-body mb-2">
            Select Collection
          </label>
          <select
            id="collection"
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[42px] font-body text-white"
            required
            disabled={isLoading}
          >
            <option value="">Select a collection</option>
            {collections.map((collection) => (
              <option key={collection.id.toString()} value={collection.id.toString()}>
                {collection.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="imageDescription" className="block text-sm font-medium text-gray-300 font-body mb-2">
            Image Description
          </label>
          <textarea
            id="imageDescription"
            rows={3}
            value={imageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[22px] font-body text-white"
            required
            disabled={isLoading}
            placeholder="What's your NFT about?"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="price" className="block text-sm font-medium text-gray-300 font-body mb-2">
            Price (in ICP)
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[42px] font-body text-white"
            required
            disabled={isLoading}
            placeholder="Enter price"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-primary text-black py-2 rounded-lg font-bold ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Minting...
            </span>
          ) : (
            'Create NFT'
          )}
        </button>
      </section>
    </form>
  );
};
export default MintForm;