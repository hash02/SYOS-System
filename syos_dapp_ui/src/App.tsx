import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wallet from './components/Wallet';
import MemoryLog from './components/MemoryLog';
import DriftChart from './components/DriftChart';

const App = () => {
  const dashboard = (
    <div>
      <h1>SYOS Dashboard</h1>
      <Wallet />
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
