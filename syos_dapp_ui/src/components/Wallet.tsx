import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function Wallet() {
  const [account, setAccount] = useState<string | null>(null);

  async function connect() {
    if (window.ethereum) {
      const [addr] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(addr);
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      connect();
    }
  }, []);

  return (
    <div>
      <h2>Wallet</h2>
      <p>Connected: {account ? account : 'Not Connected'}</p>
    </div>
  );
}
