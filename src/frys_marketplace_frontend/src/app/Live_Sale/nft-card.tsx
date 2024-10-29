import React from "react";
import { cn } from "../../../lib/utils";
import { NFT } from "./nft-data";
import gif from "../../../public/gif.gif";
import { AvatarsCard } from "./avatar-card";
import { connectPlug, processPayment } from '../Wallet/wallet-service';

function NFTCard({ nft }: { nft: NFT }) {
  const handleBuyClick = async () => {
    try {
      // First ensure wallet is connected
      const connected = await connectPlug();
      if (!connected) {
        console.log('Please connect your wallet first');
        return;
      }

      // Process the payment
      const result = await processPayment(nft.id.toString(), nft.price);
      console.log(nft.id.toString(), nft.price);
      console.log('Purchase successful:', result);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <div className="md:max-w-sm max-w-xl w-full my-2 h-[400px]">
      <div
        className={cn(
          `group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800`,
          // Preload hover image by setting it in a pseudo-element
          `before:bg-[url(https://media.tenor.com/gjg2V_hL2BYAAAAM/cat-kitty.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]`,
          `hover:before:opacity-100 hover:scale-95`,
          `hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50`,
          `transition-all duration-500`,
          `bg-cover`
        )}
        style={{
          backgroundImage: `url(${nft.image})`,
        }}
      >
        <div className="relative z-50 backdrop-blur-lg w-full p-2 rounded-xl">
          <div className="w-1/2 mb-[-36px]">
            <AvatarsCard avatars={nft.avatars} />
          </div>
          <div className="flex items-center justify-between">
            <div className="px-2">
              <h1 className="text-white text-lg font-bold font-body">
                {nft.name}
              </h1>
              <h1 className="text-primary font-body underline">{nft.chef}</h1>
            </div>
            <div>
              <p className="text-white text-xl font-bold font-body text-center my-2">
                {nft.price} ICP
              </p>
              <button 
                onClick={handleBuyClick}
                className="border-primary border-[2px] text-white rounded-xl py-2 px-8 font-body font-semibold hover:bg-primary transition-colors"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;