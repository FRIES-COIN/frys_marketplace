import { Actor } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { frys_marketplace_backend } from '../../../../declarations/frys_marketplace_backend';

declare global {
  interface Window {
    ic: {
      plug: {
        [x: string]: any;
        requestConnect: () => Promise<boolean>;
        isConnected: () => Promise<boolean>;
        createAgent: (args?: any) => Promise<void>;
        requestBalance: () => Promise<Array<{amount: number, symbol: string}>>;
        principal: Principal;
        requestTransfer: (arg: {
          to: string,
          amount: number,
          token?: 'ICP' | 'ckBTC',
          opts?: {
            fee?: number,
            memo?: number,
            from_subaccount?: number,
            created_at_time?: {
              timestamp_nanos: number
            }
          }
        }) => Promise<{ height: number }>
      }
    }
  }
}
export const connectPlug = async () => {
  try {
    const connected = await window.ic.plug.requestConnect();
    if (connected) {
      await window.ic.plug.createAgent();
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to connect to Plug wallet:", error);
    return false;
  }
};

export const checkConnection = async () => {
  try {
    return await window.ic.plug.isConnected();
  } catch (error) {
    console.error("Failed to check Plug connection:", error);
    return false;
  }
};

export const getBalance = async () => {
  try {
    return await window.ic.plug.requestBalance();
  } catch (error) {
    console.error("Failed to get balance:", error);
    return [];
  }
};

export const initiatePayment = async (recipientAddress: string, amount: number, tokenType: 'ICP' | 'ckBTC') => {
  try {
    const result = await window.ic.plug.requestTransfer({
      to: recipientAddress,
      amount: amount,
      token: tokenType,
    });
    return result;
  } catch (error) {
    console.error("Payment failed:", error);
    throw error;
  }
};

export const processPayment = async (id: string, price: number, tokenType: { ICP: null } | { CKBTC: null }) => {
  try {
    const result = await frys_marketplace_backend.payment(id, price, tokenType);

    return result;
  } catch (error) {
    console.log('Payment params:', { id, price, tokenType });
    throw error;
  }
};

// transfer funds from wallet to other wallet
export const transferTokens = async (recipientAddress: string, amount: number, tokenType: 'ICP' | 'ckBTC') => {
  try {
    const isConnected = await checkConnection();
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    
    const result = await initiatePayment(recipientAddress, amount, tokenType);
    return result;
  } catch (error) {
    console.error("Transfer failed:", error);
    throw error;
  }
};

export const getPrincipalID = async () => {
  try {
    const isConnected = await checkConnection();
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    return window.ic.plug.principalId;
  } catch (error) {
    console.error("Failed to get principal ID:", error);
    throw error;
  }
};

export const getConnectedWalletAgent = async () => {
  try {
    const isConnected = await checkConnection();
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    return window.ic.plug.agent;
  } catch (error) {
    console.error("Failed to get connected wallet agent:", error);
    throw error;
  }
} 