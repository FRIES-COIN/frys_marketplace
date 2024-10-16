import React from 'react';
import { Logo, DiscordIcon, YouTubeIcon, TwitterIcon, InstagramIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="text-yellow-400 py-10 px-6 mt-auto">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:space-x-8">

        <div className="flex items-start space-x-6">
          <div>
            <Logo />
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-yellow-400">NFT marketplace</p>
            <p className="text-yellow-400">Join our community</p>
            <div className="flex space-x-4">
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
        </div>

        <div className="text-center lg:text-left">
          <h2 className="font-semibold">Explore</h2>
          <ul className="space-y-2 mt-4">
            <li>
              <a href="#" className="hover:text-white text-yellow-400">Marketplace</a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-yellow-400">Rankings</a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-yellow-400">Connect a wallet</a>
            </li>
          </ul>
        </div>

        <div className="text-center lg:text-left">
          <h2 className="font-semibold">Join Our Weekly Digest</h2>
          <p className="text-gray-400 mt-1">
            Get exclusive promotions & updates straight to your inbox.
          </p>
          <form className="flex mt-4">
            <input
              type="email"
              placeholder="Enter your email here"
              className="px-4 py-2 rounded-l-md bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 rounded-r-md hover:bg-yellow-500 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-gray-500 text-sm text-center">
        &copy; FRYS COIN NFT Marketplace
      </div>
    </footer>
  );
};

export default Footer;
