import React, { useEffect, useState } from 'react';
import { createActor, FrysMarketplaceActor } from '../../declarations/frys_marketplace_backend';
import MintForm from './mint-form';
import { waitForMintingConfirmation } from './utils';
import { toast } from 'react-hot-toast';

const MintPage: React.FC = () => {
  const [actor, setActor] = useState<FrysMarketplaceActor | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const canisterId = import.meta.env.VITE_CANISTER_ID_FRYS_MARKETPLACE_BACKEND || "";
        const actor = await createActor(canisterId);
        setActor(actor);
      } catch (err) {
        console.error("Failed to create actor:", err);
      }
    };

    init();
  }, []);

  if (!actor) {
    return <div>Loading...</div>;
  }

  const handleMintSuccess = async (response: MintResponse) => {
    console.log("Minted inscription:", response);

    // Wait for minting confirmation
    const isConfirmed = await waitForMintingConfirmation(response.inscription_id);
    if (isConfirmed) {
      toast.success('Minting confirmed on the blockchain!');
    } else {
      toast.warning('Minting initiated but confirmation is taking longer than expected');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MintForm onMint={handleMintSuccess} />
    </div>
  );
};

export default MintPage;
