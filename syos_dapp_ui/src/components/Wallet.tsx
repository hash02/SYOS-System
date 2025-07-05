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

  function disconnect() {
    setAccount(null);
  }

  useEffect(() => {
    if (window.ethereum) {
      connect();
    }
  }, []);

  return (
    <div>
      <h2>Wallet</h2>
      {account ? (
        <>
          <p>Connected: {account}</p>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
