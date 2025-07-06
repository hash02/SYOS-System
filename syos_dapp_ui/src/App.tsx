import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WalletDisplay from "./components/WalletDisplay";
import MemoryLog from "./components/MemoryLog";
import DriftChart from "./components/DriftChart";
import LivePriceDisplay from "./components/LivePriceDisplay";
import PhantomConnect from "./components/PhantomConnect";

const App = () => {
  const dashboard = (
    <div className="bg-cyber-bg text-neon-lime font-cyber min-h-screen p-6">
      <h1 className="text-4xl font-bold text-neon-blue mb-4">SYOS Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <PhantomConnect />
          <WalletDisplay />
          <LivePriceDisplay />
        </div>
        <div className="space-y-6">
          <MemoryLog />
          <DriftChart />
        </div>
      </div>
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
