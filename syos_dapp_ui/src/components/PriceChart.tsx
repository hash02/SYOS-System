import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { getHistory, Coin, TraitEntry } from '../system/TraitDatabase';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const COLORS: Record<Coin, string> = {
  BTC: '#39FF14',
  ETH: '#ff00ff',
  SOL: '#00ffff',
};

export default function PriceChart() {
  const [data, setData] = useState<Record<Coin, TraitEntry[]>>({
    BTC: getHistory('BTC'),
    ETH: getHistory('ETH'),
    SOL: getHistory('SOL'),
  });

  useEffect(() => {
    const id = setInterval(() => {
      setData({
        BTC: getHistory('BTC'),
        ETH: getHistory('ETH'),
        SOL: getHistory('SOL'),
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const labels = data.BTC.map((e) => new Date(e.timestamp).toLocaleTimeString());
  const datasets = (Object.keys(data) as Coin[]).map((coin) => ({
    label: coin,
    data: data[coin].map((e) => e.price),
    borderColor: COLORS[coin],
    backgroundColor: 'transparent',
    tension: 0.4,
  }));

  const chartData = { labels, datasets };
  const options = {
    scales: {
      x: { ticks: { color: '#39FF14' } },
      y: { ticks: { color: '#39FF14' } },
    },
    plugins: {
      legend: { labels: { color: '#39FF14' } },
    },
    responsive: true,
    maintainAspectRatio: false,
  } as const;

  return (
    <div className="bg-card p-2 h-48">
      <Line data={chartData} options={options} />
    </div>
  );
}
