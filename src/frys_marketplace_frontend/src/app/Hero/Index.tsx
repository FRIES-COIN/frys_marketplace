import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row items-center bg-[#0C0C0C] min-h-screen overflow-hidden">
      {/* Left content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 px-6 md:pl-8 py-8 md:py-16 w-full md:max-w-2xl flex flex-col items-center md:items-start justify-center md:justify-end text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
          <span className="text-[#FFA503]">Discover</span>{" "}
          <span className="text-white">unique NFTs </span>
          <span className="text-white">and cook your way to </span>
          <span className="text-white">the top.</span>
        </h1>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#FFA503] text-white font-semibold py-3 px-10 md:px-16 rounded-lg text-lg md:text-xl uppercase tracking-wide shadow-[0_0_20px_rgba(255,165,3,0.7)] hover:shadow-[0_0_30px_rgba(255,165,3,0.9)] transition-all duration-300"
        >
          explore
        </motion.button>
      </motion.div>

      {/* Right image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute right-0 top-0 mt-28 sm:mt-0 md:top-[-8%] h-full w-full md:w-[100%] flex items-center justify-center md:justify-end"
      >
        <img
          src="/Hero.png"
          alt="Animated Fries"
          className="h-2/3 md:h-5/6 object-contain"
        />
      </motion.div>

      {/* Mobile-only floating NFT cards */}
      {/* {isMobile && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 overflow-x-auto px-4">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex-shrink-0 w-24 h-32 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-white text-xs"
            >
              NFT #{index}
            </motion.div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default Hero;