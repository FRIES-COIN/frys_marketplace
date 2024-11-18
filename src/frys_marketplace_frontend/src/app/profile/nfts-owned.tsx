import * as React from "react";
import { createActor } from "../../../../declarations/frys_marketplace_backend";
import { getConnectedWalletAgent, connectPlug } from "../Wallet/wallet-service";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { collections, ICollection } from "../collections/collections";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const frysBackendCanisterID = "ia5ie-kqaaa-aaaal-arqqa-cai";

export function CarouselSize() {
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

  useEffect(() => {
    fetchNFTs();
  }, []);

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
        const byteArray = Object.values(nft.nft_image[0]);
        const uint8Array = new Uint8Array(byteArray);

        let binaryString = "";
        uint8Array.forEach((byte) => {
          binaryString += String.fromCharCode(byte);
        });
        const base64String = btoa(binaryString);
        const imageUrl = `data:image/jpeg;base64,${base64String}`;

        return {
          ...nft,
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
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-7xl"
    >
      {nfts.length === 0 && (
        <div className="flex flex-col items-center justify-center h-96 p-2">
          <h1 className="text-base font-body">
            You have not minted any NFTs yet😔
          </h1>
          <Link to="/mint" className="text-blue-500 font-bold ml-2">
            <button className="bg-black text-white font-bold py-2 px-8 rounded-md my-4 font-body">
              Mint NFT
            </button>
          </Link>
        </div>
      )}
      <CarouselContent className="w-full">
        {nfts.map((nft: any, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="border-none w-72">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div key={nft.id}>
                    <img
                      src={nft.image_url}
                      alt={nft.nft_description}
                      className="h-64 w-64 object-cover rounded-md"
                    />
                    <div className="font-body flex-col ">
                      <h1 className="text-lg font-bold">
                        #{nft.collection_id}
                      </h1>
                      <h1 className="text-sm">
                        {Number(nft.price_in_icp_tokens) / 100000000} ICP
                      </h1>
                      <p className="mt-4">Mar 11, 2021</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between bg-white w-full">
        <CarouselNext className="text-white border-none mx-4 px-2 py-1 mt-4 left-10 top-[100%]" />
        <CarouselPrevious className="text-white border-none mx-4 px-2 py-1 left-0 mt-4 top-[100%]" />
      </div>
    </Carousel>
  );
}
