import {
  IconArtboard,
  IconArtboardFilled,
  IconLogout,
  IconMenu2,
  IconSettingsFilled,
  IconUserFilled,
  IconWallet,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconBrandInstagramFilled,
  IconCamera,
  IconBrandXFilled,
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
import { useState, useEffect } from "react";
type Tab = "nft" | "wallet" | "settings" | "profile" | "logout";
import btc from "../../../public/btc.svg";
import ckbtc from "../../../public/ckbtc.png";
import cketh from "../../../public/cketh.png";
import icp from "../../../public/icp.svg";
import eth from "../../../public/eth.svg";
import frys from "../../../public/frys.jpeg";
import { QRCodeSVG } from "qrcode.react";
import qr from "../../../public/qr.png";
import { Button } from "../../../components/ui/button";
import { getBalance, transferTokens } from "../Wallet/wallet-service";
import { getPrincipalID } from "../Wallet/wallet-service";
import { get_exchange_rate } from "../services/exchangeRateService";

//NFT TAB COMPONENT
function NFTTab() {
  return (
    <div className="bg-primary rounded-md h-full w-full max-w-7xl overflow-hidden md:mx-4 text-black">
      <div className="flex items-center justify-between mt-2">
        <h1 className="text-2xl font-bold font-body px-2 md:mt-12 mx-2">
          Overview
        </h1>
        <button className="bg-black rounded-[52px] md:px-6 md:py-4 py-2 px-4 text-white font-body md:mt-12 md:mx-6 mx-2">
          View all
        </button>
      </div>
      <CarouselSize />
    </div>
  );
}

//WALLET TAB COMPONENT
function WalletTab() {
  const [balance, setBalance] = useState<
    Array<{ amount: number; symbol: string }>
  >([]);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedToken, setSelectedToken] = useState<"ICP" | "CKBTC" | "FRYS">(
    "ICP"
  );
  const [principalId, setPrincipalId] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const walletBalance = await getBalance();
      setBalance(walletBalance);
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchPrincipalId = async () => {
      try {
        const id = await getPrincipalID();
        setPrincipalId(id);
      } catch (error) {
        console.error("failed to get principal Id");
      }
    };
    fetchPrincipalId();
  }, []);

  const handleTransfer = async () => {
    try {
      const result = await transferTokens(
        recipientAddress,
        amount,
        selectedToken as "ICP" | "CKBTC" | "FRYS"
      );
      alert("Transfer successful!");
      setRecipientAddress("");
      setAmount(0);
    } catch (error) {
      alert("Transfer failed. Please try again.");
    }
  };
  useEffect(() => {
    const fetchExchangeRate = async () => {
      const rate = await get_exchange_rate();
      if (typeof rate === "number") {
        setExchangeRate(rate);
      }
    };
    fetchExchangeRate();
  }, []);

  const handleReceive = () => {
    // const principal = await requestConnect();
    const userAddress = window.ic?.plug?.principal?.toString();
    if (userAddress) {
      alert(`Your receiving address is: ${userAddress}`);
    } else {
      alert("Please connect your wallet first");
    }
  };

  const convertAmount = (
    value: number,
    from: "ICP" | "CKBTC",
    to: "ICP" | "CKBTC"
  ) => {
    if (from === "ICP" && to === "CKBTC") {
      return value * exchangeRate;
    } else if (from === "CKBTC" && to === "ICP") {
      return value / exchangeRate;
    }
    return value;
  };

  const handleTokenChange = (newToken: "ICP" | "CKBTC" | "FRYS") => {
    if (newToken === "ICP" || newToken === "CKBTC") {
      const newAmount = convertAmount(
        amount,
        selectedToken as "ICP" | "CKBTC",
        newToken
      );
      setConvertedAmount(newAmount);
    }

    setSelectedToken(newToken);
  };

  return (
    <div className="bg-[#151415] rounded-md h-full px-2">
      <div className="text-white font-body w-full pt-4 flex items-center justify-center">
        <Select>
          <SelectTrigger className="md:w-1/4 border-none bg-[#202020] h-12 -mr-2">
            <SelectValue
              placeholder="Choose token"
              className="flex items-center gap-2 placeholder:text-gray-500"
            />
          </SelectTrigger>
          <SelectContent className="bg-[#202020] w-[14rem] border-none">
            <SelectItem
              value="ckbtc"
              onClick={() => setSelectedToken("CKBTC")}
              className="flex items-center gap-2 justify-between w-full mt-4"
            >
              <div className="w-full flex flex-row items-center gap-2">
                <img src={ckbtc} alt="btc" className="w-8 h-8 rounded-full" />
                <p className="uppercase font-body font-semibold text-gray-500">
                  CKBTC
                </p>
              </div>
            </SelectItem>
            <SelectItem
              value="ICP"
              onClick={() => setSelectedToken("ICP")}
              className="flex items-center gap-2 justify-between w-full mt-4"
            >
              <div className="w-full flex flex-row items-center gap-2">
                <img src={icp} alt="icp" className="w-8 h-8" />
                <p className="uppercase font-body font-semibold text-gray-500">
                  ICP
                </p>
              </div>
            </SelectItem>
            <SelectItem
              value="eth"
              className="flex items-center gap-2 justify-between w-full mt-4"
            >
              <div className="w-full flex flex-row items-center gap-2">
                <img src={cketh} alt="eth" className="w-8 h-8 rounded-full" />
                <p className=" font-body font-semibold text-gray-500">ckETH</p>
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
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="0.0000"
          className="md:w-1/4 border-none bg-[#202020] md:h-16 h-12 focus:ring-0 focus:border-0 focus:outline-none"
        />
      </div>

      <div className="text-white font-body mt-4 text-center">
        {convertedAmount > 0 && (
          <p className="text-gray-500">
            converted: {convertedAmount.toFixed(8)} {selectedToken}
          </p>
        )}
      </div>

      {/* Balance Display */}
      <div className="text-white font-body mt-4 text-center">
        {balance.map((item, index) => (
          <p key={index} className="text-gray-500">
            {item.symbol}: {item.amount}
          </p>
        ))}
      </div>

      <div>
        <QRCodeSVG
          value={principalId}
          className="xl:w-[15%] md:w-[20%] h-56 md:h-auto mx-auto md:mt-8 mt-2 rounded"
          size={224}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          includeMargin={false}
        />
      </div>

      <div className="w-full flex items-center justify-center mt-4">
        <Input
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          placeholder="Enter deposit address"
          className="md:w-1/2 w-3/4 border-none bg-[#202020] text-white h-10 focus:ring-0 focus:border-0 focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-center mt-4 md:my4">
        <p className="text-center font-body text-xs leading-relaxed text-gray-500 md:w-1/2">
          ❌ Never reveal to anyone your private keys or secret phrases.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={handleTransfer}
          className="bg-primary text-white w-1/4 mx-auto mt-4 font-body"
        >
          Send
        </Button>
        <Button
          onClick={handleReceive}
          className="bg-primary text-white w-1/4 mx-auto mt-4 font-body"
        >
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
      <div className="flex flex-col md:gap-12 gap-6">
        <div className="flex-1">
          <div className="md:mb-8 mb-2">
            <h2 className="text-primary font-body font-bold text-xl md:text-[26px] md:mb-4">
              Account
            </h2>
            <div className="">
              <div className="flex items-center gap-2 rounded max-w-lg">
                <div className="flex-1 my-1 md:my-2">
                  <label className="text-gray-300 mb-1 block font-body">
                    Username
                  </label>

                  <label className="text-gray-500 mb-1 md:mb-2 block font-body">
                    @n
                  </label>
                </div>
                <button className="px-4 py-2 rounded text-white font-body bg-primary">
                  Change
                </button>
              </div>
              <div className="flex items-center gap-2 rounded max-w-lg">
                <div className="flex-1">
                  <label className="text-gray-300 mb-1 block font-body">
                    Email Address
                  </label>

                  <label className="text-gray-500 mb-1 md:mb-2 block font-body">
                    alexarawles@gmail.com
                  </label>
                </div>
                <button className="px-4 py-2 rounded text-white font-body bg-primary">
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <h2 className="text-primary font-body font-bold text-xl md:text-[26px] md:mb-4">
              Notifications
            </h2>
            <div className="space-y-2 flex flex-col  max-w-md">
              <label className="inline-flex items-center gap-2 py-1 px-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="text-[#0075FF] rounded border-none focus:ring-0"
                />
                <span className="text-gray-400 font-body">
                  New followers alert
                </span>
              </label>

              <label className="inline-flex items-center gap-2 py-1 px-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="text-[#0075FF] rounded border-none focus:ring-0"
                />
                <span className="text-gray-400 font-body">
                  Posts like alert
                </span>
              </label>
            </div>
          </div>

          <div className="mb-2">
            <h2 className="text-primary font-body font-bold text-xl md:text-[26px] md:mb-4">
              Email Notifications
            </h2>
            <div className="mb-1">
              <label className="inline-flex items-center gap-2 py-1 px-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="text-[#0075FF] rounded border-none focus:ring-0"
                />
                <span className="text-gray-400 font-body">
                  New followers alert
                </span>
              </label>
            </div>
            <div className="flex flex-col max-w-md">
              <label className="inline-flex items-center gap-2 py-1 px-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="text-[#0075FF] rounded border-none focus:ring-0"
                />
                <span className="text-gray-400 font-body">
                  Post replies alert
                </span>
              </label>

              <label className="inline-flex mt-1 items-center gap-2 py-1 px-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="text-[#0075FF] rounded border-none focus:ring-0"
                />
                <span className="text-gray-400 font-body">Post tags alert</span>
              </label>
            </div>
          </div>
        </div>
        <div className="md:mt-0 w-full md:w-[370px] order-last md:order-none">
          <h2 className="text-primary font-body font-bold text-xl md:text-[26px] md:mb-4">
            Security
          </h2>
          <div className="w-full md:w-[370px] rounded-[6px] flex flex-col items-start justify-center">
            <p className="text-gray-500 font-body mt-2">
              Require a pin to transfer funds
            </p>
            <input
              type="checkbox"
              className="toggle toggle-md mt-2"
              id="security"
              defaultChecked
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//PROFILE TAB
function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  function UserProfile({
    setIsEditing,
  }: {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    return (
      <div className="rounded-md p-2 md:px-5 md:pb-26 md:pt-[10px] md:m-5">
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
                className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer"
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
              <p className="font-medium font-body text-gray-400">
                Alexa Rawles
              </p>
              <p className="text-gray-500 font-body">alexarawles@gmail.com</p>
            </div>
          </div>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md transform transition-transform hover:scale-110 font-body"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
        <div>
          <div className="mt-2 md:mt-4">
            <h1 className="text-xl font-body font-bold md:text-[26px] mb-1 md:mb-2 text-primary">
              About
            </h1>
            <p className="text-gray-400 font-body md:text-lg">
              This is your about section.
            </p>
          </div>
          <div className="mt-4 md:mt-4 flex gap-4">
            <h1 className="font-body text-primary text-lg font-bold">
              Language:{" "}
            </h1>
            <p className="text-gray-400 text-lg font-body">English</p>
          </div>
          <div className="mt-4 md:mt-4 flex gap-4">
            <h1 className="font-body text-primary text-lg font-bold">
              Country:{" "}
            </h1>
            <p className="text-gray-400 text-lg font-body">Kenya</p>
          </div>
          <div className="mt-4">
            <h1 className="text-xl font-body font-bold md:text-[26px] mb-1 md:mb-2 text-primary">
              Socials
            </h1>
            <div className="flex flex-row justify-between md:justify-normal items-center mt-4 md:gap-4">
              <div className="mx-4 md:mx-0">
                <IconBrandXFilled
                  size={40}
                  className="md:text-xl cursor-pointer hover:text-primary hover:scale-105 ease-in duration-150 transition-all"
                />
              </div>
              <div>
                <IconBrandGithubFilled
                  size={40}
                  className="md:text-xl cursor-pointer hover:text-primary hover:scale-105 ease-in duration-150 transition-all"
                />
              </div>
              <div>
                <IconBrandLinkedinFilled
                  size={40}
                  className="md:text-xl cursor-pointer hover:text-primary hover:scale-105 ease-in duration-150 transition-all"
                />
              </div>
              <div>
                <IconBrandInstagramFilled
                  size={40}
                  className="md:text-xl cursor-pointer hover:text-primary hover:scale-105 ease-in duration-150 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function EditingUserProfile({
    setIsEditing,
  }: {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    return (
      <section className="mx-2">
        <div className="flex flex-col md:flex-row flex-wrap gap-4 md:p-5 mt-2 text-black">
          <div className="space-y-4 flex-1 min-w-[280px]">
            <div className="flex flex-col">
              <label className="font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80 text-gray-400">
                Username
              </label>
              <input
                type="text"
                placeholder="What should we call you?"
                className="w-full md:h-[52px] h-[42px] bg-[#282828] rounded-[8px] px-4 text-primary placeholder-gray-500 font-body"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80 text-gray-400">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full md:h-[52px] h-[42px] bg-[#282828] rounded-[8px] px-4 text-primary placeholder-gray-500 font-body"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
                About
              </label>
              <textarea
                placeholder="Tell us about yourself"
                className="w-full md:h-[52px] h-[42px]  bg-[#282828] rounded-[8px] px-4 text-primary pt-2 placeholder-gray-500 font-body"
                // disabled={!isEditing}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
                Instagram
              </label>
              <div className="flex flex-row bg-[#282828] rounded-[8px] items-center">
                <label className="font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80 text-gray-400">
                  <IconBrandInstagramFilled size={34} className="mx-2" />
                </label>
                <input
                  type="text"
                  placeholder="Instagram profile link"
                  className="w-full md:h-[52px] h-[42px] bg-[#282828] rounded-[8px] px-4 text-primary placeholder-gray-500 font-body focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4 flex-1 min-w-[280px]">
            <div className="flex flex-col">
              <label className="text-gray-400 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
                Country
              </label>
              <select
                className="w-full md:h-[52px] h-[42px]  bg-[#282828] rounded-[8px] px-4 text-primary placeholder-gray-500 font-body appearance-none cursor-pointer bg-no-repeat bg-right pr-16"
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
              <label className="text-gray-400 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
                Language
              </label>
              <select
                className="w-full md:h-[52px] h-[42px]  bg-[#282828] rounded-[8px] px-4 text-primary placeholder-gray-500 font-body appearance-none cursor-pointer bg-no-repeat bg-right pr-16"
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
            <div className="flex flex-col">
              <label className="text-gray-400 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
                Twitter
              </label>
              <div className="flex flex-row bg-[#282828] rounded-[8px] items-center">
                <label className="font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80 text-gray-400">
                  <IconBrandXFilled size={32} className="mx-2" />
                </label>
                <input
                  type="text"
                  placeholder="X profile link"
                  className="w-full md:h-[52px] h-[42px] bg-[#282828] rounded-[8px] px-4 text-primary placeholder-gray-500 font-body focus:border-none focus:ring-0 border-none focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80">
                Linkedin
              </label>
              <div className="flex flex-row bg-[#282828] rounded-[8px] items-center">
                <label className="font-[400] text-[16px] leading-[24px] mb-1 font-body opacity-80 text-gray-400">
                  <IconBrandLinkedinFilled size={34} className="mx-2" />
                </label>
                <input
                  type="text"
                  placeholder="Linkedin profile link"
                  className="w-full md:h-[52px] h-[42px] bg-[#282828] rounded-[8px] px-4 text-primary placeholder-gray-500 font-body focus:border-none focus:ring-0 border-none focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-4 justify-center md:justify-normal">
          <button
            className="bg-primary px-4 py-2 rounded-md text-white font-body my-4"
            onClick={() => setIsEditing(false)}
          >
            Update Details
          </button>
        </div>
      </section>
    );
  }
  return isEditing ? (
    <EditingUserProfile setIsEditing={setIsEditing} />
  ) : (
    <UserProfile setIsEditing={setIsEditing} />
  );
}

//SIDEBAR COMPONENT
function Sidebar() {
  const [tab, setTab] = useState<Tab>("nft");
  return (
    <div className="md:flex min-h-screen gap-8 w-full">
      <div className="md:hidden flex items-center justify-between w-full overflow-scrolls px-2 mb-4">
        <div
          className={`flex items-center gap-1 text-sm cursor-pointer py-2 px-4 rounded-md ${
            tab === "nft" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("nft")}
        >
          {/* <IconArtboardFilled size={14} className="text-white" /> */}
          <h1 className="text-white font-body">NFTs</h1>
        </div>
        <div
          className={`flex items-center gap-1 text-sm cursor-pointer py-2 px-4 rounded-md ${
            tab === "wallet" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("wallet")}
        >
          {/* <IconWallet size={14} className="text-white" /> */}
          <h1 className="text-white font-body">Wallet</h1>
        </div>
        <div
          className={`flex items-center text-sm gap-1 cursor-pointer py-2 px-4 rounded-md ${
            tab === "settings" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("settings")}
        >
          {/* <IconSettingsFilled size={14} className="text-white" /> */}
          <h1 className="text-white font-body">Settings</h1>
        </div>
        <div
          className={`flex items-center gap-1 text-sm cursor-pointer py-2 px-4 rounded-md ${
            tab === "profile" ? "bg-primary" : ""
          }`}
          onClick={() => setTab("profile")}
        >
          {/* <IconUserFilled size={14} className="text-white" /> */}
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
