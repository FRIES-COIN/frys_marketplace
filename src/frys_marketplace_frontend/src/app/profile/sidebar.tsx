import {
  IconArtboard,
  IconArtboardFilled,
  IconLogout,
  IconSettingsFilled,
  IconUserFilled,
  IconWallet,
} from "@tabler/icons-react";
import { CarouselSize } from "./nfts-owned";
import { useState } from "react";
type Tab = "nft" | "wallet" | "settings" | "profile" | "logout";

function NFTTab() {
  return (
    <div className="bg-primary rounded-md h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-body px-2 mt-12 mx-2">
          Overview
        </h1>
        <button className="bg-black rounded-[52px] px-6 py-4 text-white font-body mt-12 mx-2">
          View all
        </button>
      </div>
      <CarouselSize />
    </div>
  );
}

function Sidebar() {
  const [tab, setTab] = useState<Tab>("nft");
  return (
    <div className="flex items-center h-[80vh] gap-8">
      <nav className="flex flex-col justify-between h-3/4 flex-2">
        <section className="flex flex-col gap-8">
          <div
            className={`flex items-center gap-4 cursor-pointer py-2 px-4 rounded-md ${
              tab === "nft" ? "bg-primary" : ""
            }`}
            onClick={() => setTab("nft")}
          >
            <IconArtboardFilled size={24} className="text-white" />
            <h1 className="text-white font-body">NFTs</h1>
          </div>
          <div
            className={`flex items-center gap-4 cursor-pointer py-2 px-4 rounded-md ${
              tab === "wallet" ? "bg-primary" : ""
            }`}
            onClick={() => setTab("wallet")}
          >
            <IconWallet size={24} className="text-white" />
            <h1 className="text-white font-body">Wallet</h1>
          </div>
          <div
            className={`flex items-center gap-4 cursor-pointer py-2 px-4 rounded-md ${
              tab === "settings" ? "bg-primary" : ""
            }`}
            onClick={() => setTab("settings")}
          >
            <IconSettingsFilled size={24} className="text-white" />
            <h1 className="text-white font-body">Settings</h1>
          </div>
          <div
            className={`flex items-center gap-4 cursor-pointer py-2 px-4 rounded-md ${
              tab === "profile" ? "bg-primary" : ""
            }`}
            onClick={() => setTab("profile")}
          >
            <IconUserFilled size={24} className="text-white" />
            <h1 className="text-white font-body">Profile</h1>
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <div
            className={`flex items-center gap-4 cursor-pointer py-2 px-4 rounded-md ${
              tab === "logout" ? "bg-primary" : ""
            }`}
          >
            <IconLogout size={24} className="text-white" />
            <h1 className="text-white font-body">Log out</h1>
          </div>
        </section>
      </nav>
      <aside className="flex-1 h-3/4">
        <NFTTab />
      </aside>
    </div>
  );
}

export default Sidebar;
