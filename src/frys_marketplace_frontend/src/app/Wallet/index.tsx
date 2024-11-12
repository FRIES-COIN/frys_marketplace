// Main wallet component
import React from "react";
import { connectPlug, checkConnection } from "./wallet-service";

export const WalletConnect = () => {
  const handleConnect = async () => {
    const connected = await connectPlug();
    if (connected) {
      // Handle successful connection
      console.log("Successfully connected to wallet");
      const isConnected = await checkConnection();
      if (isConnected) {
        window.location.reload();
      }
    }
  };
  return (
    <button
      onClick={handleConnect}
      className="bg-yellow-400 text-black px-4 py-2 rounded-md font-body hover:bg-yellow-500 transition-colors"
    >
      Connect Wallet
    </button>
  );
};
