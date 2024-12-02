import React, { useEffect, useState } from "react";
import NFTCard, { INFT } from "./nft-card";
import { NFT } from "./nft-data";
import { connectPlug, getConnectedWalletAgent } from "../Wallet/wallet-service";
import { createActor } from "../../../../declarations/frys_marketplace_backend";
import { frysBackendCanisterID, LoadingCard } from "../collections";

function LiveSale() {
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<
    Array<{
      id: bigint;
      collection_id: bigint;
      nft_description: string;
      price_in_icp_tokens: bigint;
      created_at: bigint;
      minter_principal_id: string;
      image_url: string;
    }>
  >([]);
  const fetchNFTs = async () => {
    try {
      const connectedWallet = await connectPlug();
      if (!connectedWallet) {
        console.error("No connected wallet found.");
        return;
      }
      const sessionAgent = await getConnectedWalletAgent();
      const actor = createActor(frysBackendCanisterID, sessionAgent);
      const allNFTs = await actor.get_all_nfts();

      const processedNFTs = allNFTs.map((nft) => {
        const nftImage = nft.nft_image[0];
        const byteArray = Array.isArray(nftImage) ? nftImage : Array.from(nftImage);
        const uint8Array = new Uint8Array(byteArray);

        let binaryString = "";
        uint8Array.forEach((byte) => {
          binaryString += String.fromCharCode(byte);
        });
        const base64String = btoa(binaryString);
        const imageUrl = `data:image/jpeg;base64,${base64String}`;

        return {
          id: nft.id,
          collection_id: nft.collection_id,
          nft_description: nft.nft_description,
          price_in_icp_tokens: nft.price_in_icp_tokens,
          created_at: nft.created_at,
          image_url: imageUrl,
          minter_principal_id: nft.minter_principal_id.toText(),
        };
      });

      setNfts(processedNFTs);
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="my-4 md:my-12 mx-2">
      <h1 className="text-bold font-body font-bold text-primary text-xl md:text-2xl mb-3">
        Live Sale
      </h1>
      <section className="w-full flex-col flex items-center justify-center">
        {loading ? (
          <div className="flex justify-center items-center w-screen">
            <span className="loading loading-infinity loading-lg bg-primary"></span>
          </div>
        ) : null}
        {nfts.length === 0 && !loading ? (
          <div className="w-full flex justify-center items-center">
            <span className="text-lg text-gray-500 font-body">
              No NFTs available
            </span>
          </div>
        ) : null}
        <div className="md:grid flex items-center justify-center flex-col md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
          {nfts.map((nft: INFT) => (
            <NFTCard nft={nft} key={nft.id} loading={loading} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default LiveSale;
