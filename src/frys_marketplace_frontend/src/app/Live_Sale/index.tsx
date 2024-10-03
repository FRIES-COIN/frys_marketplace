import React from "react";
import NFTCard from "./nft-card";
import { NFT, nfts } from "./nft-data";

function LiveSale() {
  return (
    <div className="my-4 md:my-12">
      <h1 className="text-bold font-body font-bold text-primary text-xl md:text-2xl mb-3">
        Live Sale
      </h1>
      <div className="md:grid flex items-center justify-center flex-col md:grid-cols-2 lg:grid-cols-4 gap-2">
        {nfts.map((nft: NFT) => (
          <NFTCard nft={nft} key={nft.id} />
        ))}
      </div>
    </div>
  );
}

export default LiveSale;
