import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WalletDisplay from "./components/WalletDisplay";
import MemoryLog from "./components/MemoryLog";
import DriftChart from "./components/DriftChart";

const App = () => {
  const dashboard = (
    <div className="bg-base text-white min-h-screen px-8 py-6">
      <h1 className="text-4xl font-bold text-anchor">SYOS Dashboard</h1>
      <WalletDisplay />
      <MemoryLog />
      <DriftChart />
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
