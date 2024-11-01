import {
  IconArtboard,
  IconArtboardFilled,
  IconLogout,
  IconMenu2,
  IconSettingsFilled,
  IconUserFilled,
  IconWallet,
} from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import { Input } from "../../../components/ui/input";
import { CarouselSize } from "./nfts-owned";
import { useState } from "react";
type Tab = "nft" | "wallet" | "settings" | "profile" | "logout";
import btc from "../../../public/btc.svg";
import icp from "../../../public/icp.svg";
import eth from "../../../public/eth.svg";
import frys from "../../../public/frys.jpeg";
import qr from "../../../public/qr.png";
import { Button } from "../../../components/ui/button";

//NFT TAB COMPONENT
function NFTTab() {
  return (
    <div className="bg-primary rounded-md h-full w-full max-w-7xl overflow-hidden mx-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-body px-2 mt-12 mx-2">
          Overview
        </h1>
        <button className="bg-black rounded-[52px] px-6 py-4 text-white font-body mt-12 mx-6">
          View all
        </button>
      </div>
      <CarouselSize />
    </div>
  );
}

//WALLET TAB COMPONENT
function WalletTab() {
  return (
    <div className="bg-[#151415] rounded-md h-full px-2">
      <div className="text-white font-body w-full pt-4 flex items-center justify-center">
        <Select>
          <SelectTrigger className="md:w-1/4 border-none bg-[#202020] h-16 -mr-2">
            <SelectValue
              placeholder="Choose token"
              className="flex items-center gap-2 placeholder:text-gray-500"
            />
          </SelectTrigger>
          <SelectContent className="bg-[#202020] w-[14rem] border-none">
            <SelectItem
              value="btc"
              className="flex items-center gap-2 justify-between w-full mt-4"
            >
              <div className="w-full flex flex-row items-center gap-2">
                <img src={btc} alt="btc" className="w-8 h-8" />
                <p className="uppercase font-body font-semibold text-gray-500">
                  btc
                </p>
              </div>
            </SelectItem>
            <SelectItem
              value="icp"
              className="flex items-center gap-2 justify-between w-full mt-4"
            >
              <div className="w-full flex flex-row items-center gap-2">
                <img src={icp} alt="icp" className="w-8 h-8" />
                <p className="uppercase font-body font-semibold text-gray-500">
                  icp
                </p>
              </div>
            </SelectItem>
            <SelectItem
              value="eth"
              className="flex items-center gap-2 justify-between w-full mt-4"
            >
              <div className="w-full flex flex-row items-center gap-2">
                <img src={eth} alt="eth" className="w-8 h-8" />
                <p className="uppercase font-body font-semibold text-gray-500">
                  eth
                </p>
              </div>
            </SelectItem>
            <SelectItem
              value="frys"
              className="flex items-center gap-2 justify-between w-full mt-4"
            >
              <div className="w-full flex flex-row items-center gap-2">
                <img
                  src={frys}
                  alt="FRYS COIN"
                  className="w-8 h-8 rounded-full"
                />
                <p className="uppercase font-body font-semibold text-gray-500">
                  frys
                </p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="0.0000"
          className="md:w-1/4 border-none bg-[#202020] h-16 focus:ring-0 focus:border-0 focus:outline-none"
        />
      </div>
      <div>
        <img
          src={qr}
          className="xl:w-[15%] md:w-[20%] h-56 md:h-auto mx-auto mt-8 rounded-md"
        />
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <Input
          placeholder="Enter deposit address"
          className="w-1/2 border-none bg-[#202020] text-white md:h-16 h-10 focus:ring-0 focus:border-0 focus:outline-none"
        />
      </div>
      <div className="flex items-center justify-center mt-4">
        <p className="text-center font-body text-xs leading-relaxed text-gray-500 md:w-1/2">
          Always start with small amounts of transactions whether you are newbie
          or an expert and be on the look out for phishing scams going on in the
          crypto industry.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Button className="bg-primary text-white w-1/4 mx-auto mt-4 font-body">
          Send
        </Button>
        <Button className="bg-primary text-white w-1/4 mx-auto mt-4 font-body">
          Receive
        </Button>
      </div>
    </div>
  );
}

function Sidebar() {
  const [tab, setTab] = useState<Tab>("nft");
  return (
    <div className="md:flex items-center h-[80vh] gap-8">
      <div className="md:hidden flex items-center justify-between w-full overflow-scrolls px-2 mb-4">
        <div
          className={`flex items-center gap-4 text-sm cursor-pointer py-2 px-4 rounded-md ${
            tab === "nft" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("nft")}
        >
          <IconArtboardFilled size={14} className="text-white" />
          <h1 className="text-white font-body">NFTs</h1>
        </div>
        <div
          className={`flex items-center gap-4 text-sm cursor-pointer py-2 px-4 rounded-md ${
            tab === "wallet" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("wallet")}
        >
          <IconWallet size={14} className="text-white" />
          <h1 className="text-white font-body">Wallet</h1>
        </div>
        <div
          className={`flex items-center text-sm gap-4 cursor-pointer py-2 px-4 rounded-md ${
            tab === "settings" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("settings")}
        >
          <IconSettingsFilled size={14} className="text-white" />
          <h1 className="text-white font-body">Settings</h1>
        </div>
        <div
          className={`flex items-center gap-4 text-sm cursor-pointer py-2 px-4 rounded-md ${
            tab === "profile" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("profile")}
        >
          <IconUserFilled size={14} className="text-white" />
          <h1 className="text-white font-body transition-all duration-150">
            Profile
          </h1>
        </div>
      </div>
      {/* hidden in smaller screen */}
      <nav className="md:flex flex-col justify-between h-3/4 flex-2 hidden">
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
            <h1 className="text-white font-body transition-all duration-150">
              Profile
            </h1>
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
      <aside className="flex-1 h-3/4 overflow-hidden">
        {
          tab === "nft" ? <NFTTab /> : tab === "wallet" ? <WalletTab /> : null //to be continued with settings and profile tabs
        }
      </aside>
    </div>
  );
}

export default Sidebar;
