import { Actor } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { frys_marketplace_backend } from '../../../../declarations/frys_marketplace_backend';

declare global {
  interface Window {
    ic: {
      plug: {
        requestConnect: () => Promise<boolean>;
        isConnected: () => Promise<boolean>;
        createAgent: (args?: any) => Promise<void>;
        requestBalance: () => Promise<Array<{amount: number, symbol: string}>>;
        requestTransfer: (arg: {
          to: string,
          amount: number,
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

export const initiatePayment = async (recipientAddress: string, amount: number) => {
  try {
    const result = await window.ic.plug.requestTransfer({
      to: recipientAddress,
      amount: amount,
    });
    return result;
  } catch (error) {
    console.error("Payment failed:", error);
    throw error;
  }
};


export const processPayment = async (id: string, price: number) => {
  try {
    // First handle the Plug wallet transfer
    const plugTransfer = await window.ic.plug.requestTransfer({
      to: import.meta.env.VITE_CANISTER_ID_FRYS_MARKETPLACE_BACKEND,
      amount: price,
    });

    // Then call the backend payment function
    const result = await frys_marketplace_backend.payment(id, price);
    return result;
  } catch (error) {
    console.error('Payment processing failed:', error);
    throw error;
  }
};