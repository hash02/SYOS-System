import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const DriftChart: React.FC = () => {
  const data = {
    labels: ['T1', 'T2', 'T3', 'T4'],
    datasets: [
      {
        label: 'Symbolic Drift Index',
        data: [0.1, 0.3, 0.2, 0.5],
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Drift Prediction Chart',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DriftChart;
