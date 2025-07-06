import React, { FC, useMemo, useEffect, useState } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

const WalletBalance: FC = () => {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) return;
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    connection
      .getBalance(publicKey)
      .then((lamports) => setBalance(lamports / LAMPORTS_PER_SOL));
  }, [publicKey, connected]);

  if (!connected) return null;

  return (
    <p className="text-neon-orange mt-2">SOL Balance: {balance?.toFixed(2)}</p>
  );
};

const PhantomConnect: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="my-4">
            <WalletMultiButton className="!bg-neon-pink hover:!bg-neon-purple" />
            <WalletBalance />
          </div>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default PhantomConnect;
