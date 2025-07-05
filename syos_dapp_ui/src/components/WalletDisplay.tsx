import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletDisplay: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert('Install MetaMask first');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      const bal = await provider.getBalance(addr);
      setAddress(addr);
      setBalance(ethers.formatEther(bal) + ' ETH');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Wallet</h2>
      {!address ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Balance:</strong> {balance}
          </p>
        </>
      )}
    </div>
  );
};

export default WalletDisplay;
