import React, { useState } from "react";
import {
  Logo,
  DiscordIcon,
  YouTubeIcon,
  TwitterIcon,
  InstagramIcon,
} from "./Icons";
import { connectPlug } from '../Wallet/wallet-service';

const Footer = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleWalletConnect = async () => {
    const connected = await connectPlug();
    setIsConnected(connected);
  };

  return (
    <footer className="bg-black text-yellow-400 py-10 px-6 mt-auto">
      <div className="container mx-auto flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:justify-between lg:items-start">
        <div className="flex flex-col items-center lg:items-start space-y-4 font-body">
          <Logo />
          <p className="text-gray-400 text-center lg:text-left">
            NFT marketplace
          </p>
          <p className="text-gray-400 text-center lg:text-left">
            Join our community
          </p>
          <div className="flex space-x-4 justify-center lg:justify-start">
            <a href="#" aria-label="Discord" className="hover:text-white">
              <DiscordIcon />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white">
              <YouTubeIcon />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <TwitterIcon />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <h2 className="font-semibold font-title">Explore</h2>
          <ul className="space-y-2 mt-4 font-body">
            <li>
              <a href="#" className="hover:text-white">
                Marketplace
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Rankings
              </a>
            </li>
            <li>
              <a 
                onClick={handleWalletConnect} 
                className="hover:text-white cursor-pointer"
              >
                {isConnected ? 'Wallet Connected' : 'Connect a wallet'}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-center lg:text-left">
          <h2 className="font-semibold font-title">Join Our Weekly Digest</h2>
          <p className="text-gray-400 mt-1 font-body text-sm">
            Get exclusive promotions & updates straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center sm:items-start mt-4 space-y-2 sm:space-y-0">
            <div className="bg-gray-800 rounded-lg">
              <input
                type="email"
                placeholder="Enter your email here"
                className="px-4 py-[0.7rem] h-full font-body rounded-lg bg-inherit text-white border-none outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
              />
              <button
                type="submit"
                className="bg-primary text-black px-4 py-[0.7rem] rounded-xl font-body w-full sm:w-auto"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-gray-500 text-sm text-center font-body">
        © FRYS COIN NFT MARKETPLACE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;