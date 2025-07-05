import { useEffect, useState } from "react";

interface DriftData {
  price: number;
  predicted: number;
  confidence: number;
  anchors: string[];
}

function useDriftData() {
  const [data, setData] = useState<DriftData | null>(null);

  useEffect(() => {
    let active = true;

    const fetchDrift = async () => {
      try {
        const res = await fetch("/api/drift");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        if (active) {
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch drift data", err);
      }
    };

    fetchDrift();
    const interval = setInterval(fetchDrift, 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return data;
}

export default function DriftChart() {
  const data = useDriftData();

  if (!data) {
    return (
      <div>
        <h2>Drift Prediction</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Drift Prediction</h2>
      <p>Live Price: {data.price}</p>
      <p>Predicted Price: {data.predicted}</p>
      <p>Confidence: {data.confidence}</p>
      <p>Anchors: {data.anchors.join(', ')}</p>
    </div>
  );
}
