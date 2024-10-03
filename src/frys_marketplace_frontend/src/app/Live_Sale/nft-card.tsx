import React from "react";
import { cn } from "../../../lib/utils";
import { NFT } from "./nft-data";
import gif from "../../../public/gif.gif";

function NFTCard({ nft }: { nft: NFT }) {
  return (
    <div className="md:max-w-sm max-w-xl w-full my-2">
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
        <div className="text relative z-50 backdrop-blur-sm w-full">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            Background Overlays
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
            This card is for some special elements, like displaying background
            gifs on hover only.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
