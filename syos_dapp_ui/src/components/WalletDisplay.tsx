import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function WalletDisplay() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function connect() {
    if (!(window as any).ethereum) {
      setError("MetaMask not detected");
      return;
    }
    try {
      const [addr] = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(addr);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  return (
    <div className="bg-black/70 p-4 rounded-xl text-neon-lime border border-neon-pink">
      <h2 className="text-neon-blue mb-2">Ethereum Wallet</h2>
      {account ? (
        <p className="text-neon-purple break-all">Connected: {account}</p>
      ) : (
        <button className="px-4 py-1 rounded bg-neon-pink text-black" onClick={connect}>
          Connect Wallet
        </button>
      )}
      {error && <p className="text-neon-orange mt-2">{error}</p>}
    </div>
  );
}
