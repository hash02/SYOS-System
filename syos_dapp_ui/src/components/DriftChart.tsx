import { useEffect, useState } from "react";

interface Point {
  time: string;
  value: number;
}

export default function DriftChart() {
  const [chartData, setChartData] = useState<Point[]>([]);

  useEffect(() => {
    fetch("/api/drift")
      .then((res) => res.json())
      .then((json) => setChartData(json.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-2">Drift Data</h2>
      <ul>
        {chartData.map((d) => (
          <li key={d.time}>
            {d.time}: {d.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
