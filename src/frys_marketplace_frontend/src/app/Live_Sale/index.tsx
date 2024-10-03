import React from "react";
import NFTCard from "./nft-card";

function LiveSale() {
  return (
    <div className="my-4 md:my-12">
      <h1 className="text-bold font-body font-bold text-primary text-xl md:text-2xl">
        Live Sale
      </h1>
      <div>
        <NFTCard />
      </div>
    </div>
  );
}

export default LiveSale;
