import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function PriceChart({ data }: { data: number[] }) {
  const chartData = {
    labels: data.map((_, i) => `T${i}`),
    datasets: [
      {
        label: 'BTC Price',
        data,
        borderColor: '#39FF14',
        backgroundColor: 'rgba(57, 255, 20, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: { ticks: { color: '#39FF14' } },
      y: { ticks: { color: '#39FF14' } },
    },
    plugins: {
      legend: {
        labels: { color: '#39FF14' },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

