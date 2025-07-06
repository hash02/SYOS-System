import { useEffect, useRef, useState } from 'react';
import { createChart, type CandlestickData, CrosshairMode } from 'lightweight-charts';

const COIN_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
} as const;

type Coin = keyof typeof COIN_IDS;

export default function ChartComponent() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart>>();
  const seriesRef = useRef<ReturnType<ReturnType<typeof createChart>["addCandlestickSeries"]>>();
  const [coin, setCoin] = useState<Coin>('BTC');

  useEffect(() => {
    if (!chartContainerRef.current) return;
    if (chartRef.current) {
      chartRef.current.remove();
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: '#0d0d0d' },
        textColor: '#00ffff',
      },
      grid: {
        vertLines: { color: '#1a1a1a' },
        horzLines: { color: '#1a1a1a' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });
    chartRef.current = chart;
    const series = chart.addCandlestickSeries({
      upColor: '#00ff6a',
      downColor: '#ff4545',
      borderVisible: false,
      wickUpColor: '#00ff6a',
      wickDownColor: '#ff4545',
    });
    seriesRef.current = series;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    const loadData = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${COIN_IDS[coin]}/ohlc?vs_currency=usd&days=1`);
        const json = await res.json();
        const data: CandlestickData[] = json.map((d: number[]) => ({
          time: d[0] / 1000,
          open: d[1],
          high: d[2],
          low: d[3],
          close: d[4],
        }));
        series.setData(data);
      } catch (e) {
        console.error('Failed to fetch data', e);
      }
    };

    loadData();
    const interval = setInterval(loadData, 10000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [coin]);

  return (
    <div>
      <div className="mb-2">
        <select
          value={coin}
          onChange={(e) => setCoin(e.target.value as Coin)}
          className="bg-card text-neon p-2"
        >
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="SOL">SOL</option>
        </select>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
}
