import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function WalletDisplay() {
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function connect() {
    if (!(window as any).ethereum) {
      setError("MetaMask not detected");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const [addr] = await provider.send("eth_requestAccounts", []);
      const net = await provider.getNetwork();
      setAccount(addr);
      setNetwork(net.name || `chain ${net.chainId}`);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  function disconnect() {
    setAccount(null);
    setNetwork(null);
  }

  useEffect(() => {
    async function init() {
      if ((window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const net = await provider.getNetwork();
          setNetwork(net.name || `chain ${net.chainId}`);
        }
        (window as any).ethereum.on("accountsChanged", async (accounts: string[]) => {
          setAccount(accounts[0] || null);
          const net = await provider.getNetwork();
          setNetwork(net.name || `chain ${net.chainId}`);
        });
        (window as any).ethereum.on("chainChanged", async () => {
          const net = await provider.getNetwork();
          setNetwork(net.name || `chain ${net.chainId}`);
        });
      }
    }
    init();
  }, []);

  return (
    <div>
      <h2>Wallet</h2>
      {account ? (
        <div>
          <p>Connected: {account.substring(0, 6)}...{account.slice(-4)}</p>
          {network && <p>Network: {network}</p>}
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
