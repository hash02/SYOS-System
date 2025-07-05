import React from 'react';
import WalletDisplay from '../components/WalletDisplay';
import SymbolicMemoryViewer from '../components/SymbolicMemoryViewer';
import DriftChart from '../components/DriftChart';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>SYOS Dashboard</h1>
      <WalletDisplay />
      <SymbolicMemoryViewer />
      <DriftChart />
    </div>
  );
};

export default Dashboard;
