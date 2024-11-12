import {
  IconArtboard,
  IconArtboardFilled,
  IconLogout,
  IconMenu2,
  IconSettingsFilled,
  IconUserFilled,
  IconWallet,
  IconLink,
  IconCamera,
} from "@tabler/icons-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
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
    <div className="bg-primary rounded-md h-full w-full max-w-7xl overflow-hidden md:mx-4 text-black">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-body px-2 mt-12 mx-2">
          Overview
        </h1>
        <button className="bg-black rounded-[52px] px-6 py-4 text-white font-body mt-12 md:mx-6 mx-2">
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
          className="md:w-1/2 w-3/4 border-none bg-[#202020] text-white h-10 focus:ring-0 focus:border-0 focus:outline-none"
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

//SETTINGS TAB COMPONENT
function SettingsTab() {
  return (
    <div className="bg-background rounded-md md:px-2 px-1 py-2 md:m-2">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-white font-body text-26px mb-4 font-bold">
              Account
            </h2>
            <div className="space-y-1">
              <div className="flex items-center gap-2 bg-[#FFA503] py-2 px-4 rounded">
                <div className="flex-1">
                  <label className="text-white mb-1 block font-body">
                    Username
                  </label>

                  <label className="text-gray-500 mb-1 md:mb-2 block font-body">
                    @n
                  </label>
                </div>
                <button
                  className="px-4 py-2 rounded text-white font-body"
                  style={{
                    background:
                      "linear-gradient(90deg, #E052A0 0%, #F15C41 100%)",
                  }}
                >
                  Change
                </button>
              </div>
              <div className="flex items-center gap-2 bg-[#FFA503] px-4 py-2 rounded">
                <div className="flex-1">
                  <label className="text-white mb-1 block font-body">
                    Email Address
                  </label>

                  <label className="text-gray-500 mb-1 md:mb-2 block font-body">
                    alexarawles@gmail.com
                  </label>
                </div>
                <button
                  className="px-4 py-2 rounded text-white font-body"
                  style={{
                    background:
                      "linear-gradient(90deg, #E052A0 0%, #F15C41 100%)",
                  }}
                >
                  Change
                </button>
              </div>
              <div className="flex items-center gap-2 bg-[#FFA503] px-4 py-2 rounded">
                <div className="flex-1">
                  <label className="text-white mb-1 block font-body">
                    Deletion
                  </label>
                  <label className="text-gray-500 mb-1 md:mb-2 block font-body">
                    alexarawles@gmail.com
                  </label>
                </div>
                <button
                  className="px-4 py-2 rounded text-white font-body"
                  style={{
                    background:
                      "linear-gradient(90deg, #E052A0 0%, #F15C41 100%)",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-white font-body text-26px font-bold mb-1 md:mb-2">
              Website Notifications
            </h2>
            <p className="text-[#9CB3C9] md:mb-4 mb-2 text-18px font-body">
              What would you like to see when you visit the Indie Hackers
              website?
            </p>

            <div className="space-y-2 flex flex-col  max-w-md">
              <label className="inline-flex items-center gap-2 bg-[#FFA503] py-1 px-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="text-[#0075FF] rounded border-none focus:ring-0"
                />
                <span className="text-white font-body">
                  Notifications for new followers
                </span>
              </label>

              <label className="inline-flex items-center gap-2 bg-[#FFA503] py-1 px-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="text-[#0075FF] rounded border-none focus:ring-0"
                />
                <span className="text-white font-body">
                  Notifications for likes on your posts
                </span>
              </label>
            </div>
          </div>

          <div className="-mt-2">
            <h2 className="text-white font-body text-26px mb-1 md:mb-2 font-bold">
              Email Notifications
            </h2>
            <p className="text-[#9CB3C9] mb-2 text-18px font-body">
              What would you like to be notified of via email?
            </p>
            <div className="mb-1">
              <label className="inline-flex items-center gap-2 bg-[#FFA503] py-1 px-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="text-[#0075FF] rounded border-none focus:ring-0"
                />
                <span className="text-white font-body">
                  Emails for new followers
                </span>
              </label>
            </div>
            <div className="flex flex-col max-w-md">
              <label className="inline-flex items-center gap-2 bg-[#FFA503] py-1 px-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="text-[#0075FF] rounded border-none focus:ring-0"
                />
                <span className="text-white font-body">
                  Emails for replies to your posts
                </span>
              </label>

              <label className="inline-flex mt-1 items-center gap-2 bg-[#FFA503] py-1 px-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="text-[#0075FF] rounded border-none focus:ring-0"
                />
                <span className="text-white font-body">
                  Emails when someone tags you
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="-mt-8 md:mt-0 w-full md:w-[370px] order-last md:order-none">
          <h2 className="text-white font-body text-26px mb-2 font-bold">
            Security
          </h2>
          <div className="bg-primary w-full md:w-[370px] md:h-[224px] h-[100px] rounded-[6px] flex flex-col items-center justify-center">
            <input
              type="checkbox"
              className="toggle toggle-md"
              id="security"
              defaultChecked
            />
            <p className="text-gray-500 font-body mt-2">
              Require a pin to transfer funds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

//PROFILE TAB
function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="bg-primary rounded-md p-2 md:px-5 md:pb-26 md:pt-[120px] md:m-5">
      <div className="flex items-center justify-between md:mb-2 md:p-11">
        <div className="flex items-center gap-4">
          <div className="relative md:w-20 md:h-20 w-14 h-14">
            <img
              src="../../../../public/avatar1.svg"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-[#4182F9] p-2 rounded-full cursor-pointer"
            >
              <IconCamera className="text-white size-4 md:size-6" />
            </label>
            <input
              type="file"
              id="profile-upload"
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-black-500 font-medium font-body text-black">
              Alexa Rawles
            </p>
            <p className="text-gray-500 font-body">alexarawles@gmail.com</p>
          </div>
        </div>
        <button className="bg-[#4182F9] text-white px-2 py-2 rounded-md transform transition-transform hover:scale-110 font-body h-[44px] w-[93px]">
          Edit
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 md:p-5 mt-2 text-black">
        <div className="space-y-4 flex-1 min-w-[280px]">
          <div className="flex flex-col">
            <label className="text-black-500 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80 text-black">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full md:h-[52px] h-[42px] bg-[#F9F9F9] rounded-[8px] px-4 text-[#000000] placeholder-gray-500 font-body"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black-500 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
              About
            </label>
            <textarea
              placeholder="Tell us about yourself"
              className="w-full md:h-[52px] h-[42px]  bg-[#F9F9F9] rounded-[8px] px-4 text-[#000000] pt-2 placeholder-gray-500 font-body"
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#000000] font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
              Language
            </label>
            <select
              className="w-full md:h-[52px] h-[42px]  bg-[#F9F9F9] rounded-[8px] px-4 text-gray-500 placeholder-gray-500 font-body appearance-none cursor-pointer bg-no-repeat bg-right pr-16"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23808080%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5%22%2F%3E%3C%2Fsvg%3E')",
                backgroundPosition: "right 16px center",
              }}
            >
              {" "}
              <option value="">Language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
        <div className="space-y-4 flex-1 min-w-[280px]">
          <div className="flex flex-col">
            <label className="text-black-500 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
              Nick Name
            </label>
            <input
              type="text"
              placeholder="Enter your nickname"
              className="w-full md:h-[52px] h-[42px]  bg-[#F9F9F9] rounded-[8px] px-4 text-[#000000] placeholder-gray-500 font-body"
            />{" "}
          </div>
          <div className="flex flex-col">
            <label className="text-black-500 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
              Country
            </label>
            <select
              className="w-full md:h-[52px] h-[42px]  bg-[#F9F9F9] rounded-[8px] px-4 text-gray-500 placeholder-gray-500 font-body appearance-none cursor-pointer bg-no-repeat bg-right pr-16"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23808080%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5%22%2F%3E%3C%2Fsvg%3E')",
                backgroundPosition: "right 16px center",
              }}
            >
              <option value="">Country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-black-500 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
              Time Zone
            </label>
            <select
              className="w-full md:h-[52px] h-[42px]  bg-[#F9F9F9] rounded-[8px] px-4 text-gray-500 placeholder-gray-500 font-body appearance-none cursor-pointer bg-no-repeat bg-right pr-16"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23808080%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5%22%2F%3E%3C%2Fsvg%3E')",
                backgroundPosition: "right 16px center",
              }}
            >
              <option value="">Timezone</option>
              <option value="pst">Pacific Time (PAT)</option>
              <option value="est">Eastern Time (EAT)</option>
              <option value="gmt">GMT</option>
              <option value="ist">IST</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[8px] md:mt-[40px] mb-2 p-5">
        <div className="space-y-2 w-[472.33px]">
          <h3 className="text-black-600 text-[16px] leading-[21px] font-body mb-2 opacity-80 text-black">
            Social Links
          </h3>
          <div className="flex items-center gap-2">
            <IconLink size={14} className="text-gray-500" />
            <input
              type="text"
              placeholder="LinkedIn"
              className="w-full h-[28px] bg-[#F6F8FA] text-gray-500 rounded-[6px] border border-[#57606A] text-left px-4 font-body text-[14px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <IconLink size={14} className="text-gray-500" />
            <input
              type="text"
              placeholder="Twitter"
              className="w-full h-[28px] bg-[#F6F8FA] text-gray-500 rounded-[6px] border border-[#57606A] text-left px-4 font-body text-[14px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <IconLink size={14} className="text-gray-500" />
            <input
              type="text"
              placeholder="OpenChat"
              className="w-full h-[28px] bg-[#F6F8FA] text-gray-500 rounded-[6px] border border-[#57606A] text-left px-4 font-body text-[14px]"
            />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <IconLink size={14} className="text-gray-500" />
            <input
              type="text"
              placeholder="Telegram"
              className="w-full h-[28px] bg-[#F6F8FA] text-gray-500 rounded-[6px] border border-[#57606A] text-left px-4 font-body text-[14px]"
            />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

//SIDEBAR COMPONENT
function Sidebar() {
  const [tab, setTab] = useState<Tab>("nft");
  return (
    <div className="md:flex h-screen gap-8 w-full">
      <div className="md:hidden flex items-center justify-between w-full overflow-scrolls px-2 mb-4">
        <div
          className={`flex items-center gap-1 text-sm cursor-pointer py-2 px-4 rounded-md ${
            tab === "nft" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("nft")}
        >
          <IconArtboardFilled size={14} className="text-white" />
          <h1 className="text-white font-body">NFTs</h1>
        </div>
        <div
          className={`flex items-center gap-1 text-sm cursor-pointer py-2 px-4 rounded-md ${
            tab === "wallet" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("wallet")}
        >
          <IconWallet size={14} className="text-white" />
          <h1 className="text-white font-body">Wallet</h1>
        </div>
        <div
          className={`flex items-center text-sm gap-1 cursor-pointer py-2 px-4 rounded-md ${
            tab === "settings" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("settings")}
        >
          <IconSettingsFilled size={14} className="text-white" />
          <h1 className="text-white font-body">Settings</h1>
        </div>
        <div
          className={`flex items-center gap-1 text-sm cursor-pointer py-2 px-4 rounded-md ${
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
      <nav className="md:flex pt-12 flex-col justify-between h-3/4 flex-2 hidden">
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
      <aside className="flex-1 h-3/4 w-full items-center justify-center">
        {tab === "nft" ? (
          <NFTTab />
        ) : tab === "wallet" ? (
          <WalletTab />
        ) : tab === "settings" ? (
          <SettingsTab />
        ) : tab === "profile" ? (
          <ProfileTab />
        ) : null}
      </aside>
    </div>
  );
}

export default Sidebar;
