import { useEffect, useState } from "react";

type WalletType = "metamask" | "phantom" | null;

export default function WalletDisplay() {
  const [ethAccount, setEthAccount] = useState<string | null>(null);
  const [solAccount, setSolAccount] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [error, setError] = useState<string | null>(null);

  async function connectMetamask() {
    if (!(window as any).ethereum) {
      setError("MetaMask not detected");
      return;
    }
    try {
      const [addr] = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      setEthAccount(addr);
      setWalletType("metamask");
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function connectPhantom() {
    const provider = (window as any).solana;
    if (!provider || !provider.isPhantom) {
      setError("Phantom not detected");
      return;
    }
    try {
      const resp = await provider.connect();
      setSolAccount(resp.publicKey.toString());
      setWalletType("phantom");
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function connect() {
    if (walletType === "metamask") {
      await connectMetamask();
    } else if (walletType === "phantom") {
      await connectPhantom();
    } else if ((window as any).ethereum) {
      await connectMetamask();
    } else if ((window as any).solana?.isPhantom) {
      await connectPhantom();
    } else {
      setError("No wallet detected");
    }
  }

  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts: string[]) => {
        setEthAccount(accounts[0] || null);
      });
      ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setEthAccount(accounts[0]);
            setWalletType("metamask");
          }
        })
        .catch(() => {});
    }

    const provider = (window as any).solana;
    if (provider && provider.isPhantom) {
      provider.on("connect", () => {
        setSolAccount(provider.publicKey?.toString() || null);
        setWalletType("phantom");
      });
      provider.connect({ onlyIfTrusted: true }).catch(() => {});
    }
  }, []);

  return (
    <div>
      <h2>Wallet</h2>
      {ethAccount && <p>Ethereum: {ethAccount}</p>}
      {solAccount && <p>Solana: {solAccount}</p>}
      {!ethAccount && !solAccount && (
        <button onClick={connect}>Connect Wallet</button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
