import { Principal } from "@dfinity/principal";
import {
  IconArrowsSort,
  IconBulbFilled,
  IconChevronDown,
  IconFilterSearch,
  IconHeart,
  IconRosetteDiscountCheck,
  IconRosetteDiscountFilled,
  IconWallet,
} from "@tabler/icons-react";
import { collections, ICollection } from "./collections";
import { ButtonsCard } from "../../../components/ui/tailwindcss-buttons";
import { useEffect, useState } from "react";
import { createActor } from "../../../../declarations/frys_marketplace_backend";
import {
  getConnectedWalletAgent,
  connectPlug,
  checkConnection,
} from "../Wallet/wallet-service";

export const frysBackendCanisterID = "ia5ie-kqaaa-aaaal-arqqa-cai";

function CollectionsHeader() {
  return (
    <section className="font-body">
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 font-title text-gray-400">
        <div className="flex items-center md:gap-1 lg:gap-3 ">
          <div className="bg-white rounded-3xl text-xs md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1 text-[#151415] font-body">
            <h1>All NFTs</h1>
          </div>
          <div className="bg-transparent rounded-3xl text-sm md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1 text-gray-400 font-body">
            <h1>Arts</h1>
          </div>
          <div className="bg-transparent rounded-3xl text-sm md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1 font-body">
            <h1>Music</h1>
          </div>
          <div className="bg-transparent rounded-3xl text-sm md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1 font-body">
            <h1>Sports</h1>
          </div>

          <div className="bg-transparent rounded-3xl text-sm md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1 font-body">
            <h1>Trading</h1>
          </div>
        </div>
        <div className="flex items-center md:justify-between justify-center cursor-pointer bg-black text-white md:py-4 py-2 px-4 my-4 rounded-[52px] w-full md:w-[20%] lg:w-[10%] border-primary border-2">
          <div className="flex items-center gap-1">
            <IconFilterSearch />
            <h1 className="text-lg font-body">Filter</h1>
          </div>
          <IconChevronDown />
        </div>
      </div>
      <div className="bg-white w-full h-[0.5px] my-6"></div>
      <div className="flex items-center md:gap-1 lg:gap-3 flex-wrap">
        <div className="bg-white rounded-[52px] text-xs md:text-base lg:text-lg md:px-6 px-2 cursor-pointer py-1 flex items-center gap-2 my-2 md:my-0 mx-1 font-body">
          <IconWallet />
          <h1>0.01 - 10 ICP</h1>
          <IconChevronDown />
        </div>
        <div className="bg-white rounded-[52px]  text-xs md:text-base lg:text-lg md:px-3 px-6 cursor-pointer py-1 flex items-center gap-2 my-2 md:my-0 mx-1 font-body">
          <IconBulbFilled />
          <h1>Auction</h1>
          <IconChevronDown />
        </div>
        <div className="bg-white rounded-[52px]  text-xs md:text-base lg:text-lg md:px-3 px-6 cursor-pointer py-1 flex items-center gap-2 my-2 md:my-0 mx-1 font-body">
          <IconRosetteDiscountCheck />
          <h1>Verified creator</h1>
          <IconChevronDown />
        </div>
        <div className="bg-white rounded-[52px]  text-xs md:text-base lg:text-lg md:px-3 px-6 cursor-pointer py-1 flex items-center gap-2 my-2 md:my-0 mx-1 font-body">
          <IconArrowsSort />
          <h1>Sort order</h1>
          <IconChevronDown />
        </div>
        <div className="bg-white rounded-[52px]  text-xs md:text-base lg:text-lg md:px-3 px-6 cursor-pointer py-1 flex items-center gap-2 my-2 md:my-0 mx-1 font-body">
          <IconRosetteDiscountFilled />
          <h1>On sale</h1>
          <IconChevronDown />
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ collection }: { collection: ICollection }) {
  return (
    <div className="relative h-[450px] w-[370px] lg:w-[400px] border-[12px] border-white rounded-[20px] overflow-hidden hover:shadow-primary hover:shadow-xl cursor-pointer  hover:scale-95 ease-in duration-200 transition-all">
      <div
        style={{ backgroundImage: `url(${collection.image})` }}
        className={`absolute inset-0 bg-no-repeat bg-cover bg-[url(${collection.image})] rounded-[10px]`}
      ></div>
      <div className="relative z-10 h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-1 rounded-[52px] bg-black/50 text-white mt-2 mx-2 py-2 px-4">
            <IconHeart />
            <p className="text-xs font-body">{collection.likes}</p>
          </div>
          <div className="flex gap-0">
            <div>
              <svg
                width="60"
                height="40"
                viewBox="0 0 60 40"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-[-4px]"
              >
                <path d="M 60,0 C 15,0 70,5 60,60 Z" />
              </svg>
            </div>
            <div className="bg-white border-[4px] border-white rounded-bl-[22px] px-2 pr-4">
              <p className="text-sm font-title text-primary">Remaining time</p>
              <p className="font-body font-bold">{collection.expiresIn}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border-[4px] border-white rounded-tr-[20px] h-[95px] w-1/2 px-2 pr-4 absolute bottom-0">
          <p className="text-lg font-title text-black font-semibold">
            {collection.name} #{collection.number}
          </p>
          <div className="text relative border-[3px] border-primary w-[70%] rounded-lg px-2 py-1 flex items-center mt-[2px]">
            <p className="text-center font-body font-bold text-primary">
              {collection.price} ICP
            </p>
            <p className="absolute top-[-10px] bg-white px-2 font-title text-xs text-primary">
              Current Bid
            </p>
          </div>
          <p className="text-center mt-1 text-sm text-gray-400 font-title">
            {collection.stock} in stock
          </p>
        </div>
        {/* <svg
              width="100"
              height="140"
              viewBox="0 0 60 40"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 ml-[8rem]"
            >
              <path d="M1,5 A 5 3 20 0 1 8 8 C 20,0 70,5 45,40 Z" />
            </svg> */}
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="relative h-[450px] w-[370px] lg:w-[400px] border-[12px] border-white rounded-[20px] overflow-hidden">
      <div className="animate-pulse bg-gray-300 h-full w-full rounded-[10px]">
        <div className="h-full w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer bg-[length:200%_100%]"></div>
      </div>
    </div>
  );
}

function CollectionsPage() {
  const [loading, setLoading] = useState(true);
  const [nftImage, setNFTImages] = useState();
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
  const [isConnected, setIsconnected] = useState(false);

  useEffect(() => {
    fetchNFTs();
  }, []);

  useEffect(() => {
    const init = async () => {
      const connected = await checkConnection();
      setIsconnected(connected);
    };

    if (!isConnected) {
      init();
    }
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

  // console.log("NFTs:", nfts);

  return (
    <div className="bg-background max-w-[96rem] mx-auto my-0 rounded-3xl px-4 pt-6 pb-4">
      <h1 className="font-bold font-body md:text-3xl text-2xl mb-6 text-primary">
        Featured NFTs🔥
      </h1>
      <CollectionsHeader />
      <section className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 space-y-2 md:gap-4 md:pl-0 pl-4">
        {loading ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : (
          nfts.map((nft) => (
            <CollectionCard
              collection={{
                id: nft.id.toString(),
                image: nft.image_url,
                name: nft.nft_description,
                number: Number(nft.collection_id),
                price: Number(nft.price_in_icp_tokens) / 100000000,
                likes: 0,
                expiresIn: "24h",
                stock: 1,
              }}
              key={Number(nft.id)}
            />
          ))
        )}
      </section>
      <div className="flex items-center justify-center my-12">
        <ButtonsCard className="bg-primary text-[#151415] mt-4 font-body border-none w-full md:w-1/2 lg:w-1/4 py-4">
          {!loading && nfts.length > 0 ? "Load more" : null}
          {!loading && nfts.length === 0 ? "No NFTs found" : null}
          {loading ? (
            <span className="loading loading-infinity loading-lg bg-[#151415]"></span>
          ) : null}
        </ButtonsCard>
      </div>
    </div>
  );
}

export default CollectionsPage;
