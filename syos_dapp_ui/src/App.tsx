import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WalletDisplay from "./components/WalletDisplay";
import MemoryLog from "./components/MemoryLog";
import DriftChart from "./components/DriftChart";
import ChartComponent from "./components/ChartComponent";
import PriceChart from "./components/PriceChart";
import TradeExecutor from "./components/TradeExecutor";

const App = () => {

  const dashboard = (
    <div className="dark bg-background text-neon font-orbitron min-h-screen p-4 md:p-8">
      <h1 className="text-4xl font-bold text-accent mb-4">SYOS Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <WalletDisplay />
        </div>
        <MemoryLog />
        <DriftChart />
        <ChartComponent />
        <PriceChart />
        <TradeExecutor />
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
