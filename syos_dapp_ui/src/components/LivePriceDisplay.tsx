import React, { useEffect, useState } from 'react';

const coins = ['bitcoin', 'ethereum', 'solana'];

const LivePriceDisplay = () => {
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`);
      const data = await res.json();
      const parsed = {
        BTC: data.bitcoin.usd,
        ETH: data.ethereum.usd,
        SOL: data.solana.usd,
      };
      setPrices(parsed);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/70 p-4 rounded-xl shadow-md text-neon-lime border border-neon-pink">
      <h2 className="text-xl font-bold text-neon-blue mb-2">📊 Live Prices</h2>
      {Object.entries(prices).map(([coin, price]) => (
        <p key={coin} className="text-neon-purple">
          {coin}: ${price.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default LivePriceDisplay;
