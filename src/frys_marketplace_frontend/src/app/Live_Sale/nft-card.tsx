import { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { connectPlug, processPayment } from "../Wallet/wallet-service";
import { LoadingCard } from "../collections";
import { get_exchange_rate } from '../services/exchangeRateService';

export interface INFT {
  id: bigint;
  collection_id: bigint;
  nft_description: string;
  price_in_icp_tokens: bigint;
  created_at: bigint;
  minter_principal_id: string;
  image_url: string;
}

function NFTCard({ nft, loading }: { nft: INFT; loading: boolean }) {
  const [selectedToken, setSelectedToken] = useState<"ICP" | "ckBTC">("ICP");
  const [convertedPrice, setConvertedPrice] = useState<number>(Number(nft.price_in_icp_tokens));

  useEffect(() => {
    const updatePrice = async () => {
      if (selectedToken === "ckBTC") {
        const rate = await get_exchange_rate();
        // Convert ICP amount to ckBTC by dividing
        const icpAmount = Number(nft.price_in_icp_tokens) / 100000000;
        const ckbtcAmount = icpAmount / rate;
        setConvertedPrice(ckbtcAmount * 100000000);
      } else {
        setConvertedPrice(Number(nft.price_in_icp_tokens));
      }
    };
    updatePrice();
  }, [selectedToken, nft.price_in_icp_tokens]);

  const handleBuyClick = async () => {
    try {
      // First ensure wallet is connected
      const connected = await connectPlug();
      if (!connected) {
        console.log("Please connect your wallet first");
        return;
      }

      // Process the payment with selected token
      const tokenObject =
        selectedToken === "ICP" ? { ICP: null } : { CKBTC: null };
      const result = await processPayment(
        nft.id.toString(),
        Number(nft.price_in_icp_tokens),
        tokenObject
      );
      console.log("Purchase successful:", result);
    } catch (error) {
      console.error("Purchase failed:", error);
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
          backgroundImage: `url(${nft.image_url})`,
        }}
      >
        <div className="relative z-50 backdrop-blur-lg w-full p-2 rounded-xl h-1/3">
          <div className="-mb-4">
            <h1 className="text-white text-xl font-bold font-body">
              #{Number(nft.collection_id)}
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="px-2">
              <h1 className="text-white text-sm font-bold font-body">
                {nft.nft_description}
              </h1>
              <h1 className="text-primary font-body underline cursor-pointer">
                {nft.minter_principal_id.substring(0, 8)}...
              </h1>
            </div>
            <div>
              <p className="text-white text-xl font-bold font-body text-center my-2">
                {(convertedPrice / 100000000).toFixed(8)} {selectedToken}
              </p>
              <div className="flex items-center gap-1">
                <select
                  value={selectedToken}
                  onChange={(e) =>
                    setSelectedToken(e.target.value as "ICP" | "ckBTC")
                  }
                  className="mr-2 rounded-xl px-2 py-2 text-white font-bold font-body bg-transparent border-2 border-primary"
                >
                  <option value="ICP" className="mx-2">
                    ICP
                  </option>
                  <option value="ckBTC" className="mx-2">
                    ckBTC
                  </option>
                </select>
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
    </div>
  );
}export default NFTCard;
