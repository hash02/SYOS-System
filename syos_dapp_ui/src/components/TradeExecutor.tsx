import { useEffect, useState } from "react";
import { Transaction } from "@solana/web3.js";

type Token = "SOL" | "USDC";

const TOKENS: Record<Token, string> = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qMDrqPDQdB7xKHy7DK7ALkXGk",
};

const DECIMALS: Record<Token, number> = {
  SOL: 9,
  USDC: 6,
};

export default function TradeExecutor() {
  const [input, setInput] = useState<Token>("SOL");
  const [output, setOutput] = useState<Token>("USDC");
  const [amount, setAmount] = useState(1);
  const [quote, setQuote] = useState<any>(null);
  const [balance, setBalance] = useState(100);

  useEffect(() => {
    const fetchQuote = async () => {
      const amountAtomic = Math.round(amount * Math.pow(10, DECIMALS[input]));
      const url = `https://quote-api.jup.ag/v6/quote?inputMint=${TOKENS[input]}&outputMint=${TOKENS[output]}&amount=${amountAtomic}&slippageBps=50`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setQuote(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchQuote();
  }, [input, output, amount]);

  const simulateTrade = async () => {
    const provider = (window as any).solana;
    if (!provider?.isPhantom) {
      alert("Phantom wallet not found");
      return;
    }
    try {
      await provider.connect();
      const tx = new Transaction();
      await provider.signTransaction(tx);
      alert("Trade simulated via Phantom");
      setBalance((b) => b - amount);
    } catch (e) {
      console.error(e);
      alert("Simulation failed");
    }
  };

  return (
    <div>
      <h2>Trade Executor</h2>
      <div className="mb-2 space-x-2">
        <select value={input} onChange={(e) => setInput(e.target.value as Token)}>
          <option value="SOL">SOL</option>
          <option value="USDC">USDC</option>
        </select>
        <span>→</span>
        <select value={output} onChange={(e) => setOutput(e.target.value as Token)}>
          <option value="SOL">SOL</option>
          <option value="USDC">USDC</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-20 ml-2"
        />
        <button onClick={simulateTrade} className="ml-2 px-2 py-1 bg-card">
          Simulate Trade
        </button>
      </div>
      {quote && (
        <div className="text-sm">
          <p>
            Out: {Number(quote.outAmount) / Math.pow(10, DECIMALS[output])}
          </p>
          <p>Price Impact: {parseFloat(quote.priceImpactPct) * 100}%</p>
        </div>
      )}
      <p className="mt-2">Mock Balance: {balance}</p>
    </div>
  );
}
