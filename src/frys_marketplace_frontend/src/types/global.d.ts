import { Principal } from '@dfinity/principal';

interface PlugWindow extends Window {
  ic: {
    plug: {
      requestConnect: () => Promise<boolean>;
      isConnected: () => Promise<boolean>;
      createAgent: (args?: any) => Promise<void>;
      requestBalance: () => Promise<Array<{ amount: number; symbol: string }>>;
      requestTransfer: (arg: {
        to: string;
        amount: number;
        opts?: {
          fee?: number;
          memo?: number;
          from_subaccount?: number;
          created_at_time?: {
            timestamp_nanos: number;
          };
        };
      }) => Promise<{ height: number }>;
      agent: any;
      getPrincipal: () => Promise<Principal>;
    };
  };
}

declare global {
  interface Window extends PlugWindow {}
}

export {};
