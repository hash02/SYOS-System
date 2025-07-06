import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WalletDisplay from "./components/WalletDisplay";
import MemoryLog from "./components/MemoryLog";
import DriftChart from "./components/DriftChart";
import PriceChart from "./components/PriceChart";

const App = () => {
  const [btcHistory, setBtcHistory] = useState<number[]>([]);

  async function fetchBTCPrice(): Promise<number> {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
    const json = await res.json();
    return parseFloat(json.bpi.USD.rate_float || json.bpi.USD.rate);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBTCPrice().then((price) => {
        setBtcHistory((prev) => [...prev.slice(-10), price]);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const dashboard = (
    <div className="bg-base text-white min-h-screen px-8 py-6">
      <h1 className="text-4xl font-bold text-anchor">SYOS Dashboard</h1>
      <WalletDisplay />
      <MemoryLog />
      <DriftChart />
      <PriceChart data={btcHistory} />
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={dashboard} />
        <Route path="*" element={dashboard} />
      </Routes>
    </Router>
  );
};

export default App;
