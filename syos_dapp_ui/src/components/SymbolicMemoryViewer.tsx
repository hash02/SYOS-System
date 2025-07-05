import React, { useEffect, useState } from 'react';

interface MemoryLog {
  timestamp: string;
  anchor: string;
  traits: string[];
  notes?: string;
}

const SymbolicMemoryViewer: React.FC = () => {
  const [logs, setLogs] = useState<MemoryLog[]>([]);

  useEffect(() => {
    fetch('/api/spiral')
      .then((res) => res.json())
      .then((data) => setLogs(data.logs || []))
      .catch((err) => console.error('API fetch error', err));
  }, []);

  return (
    <div>
      <h2>Symbolic Memory Log</h2>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>
            <strong>{log.timestamp}</strong> - {log.anchor}
            <ul>
              {log.traits.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
            {log.notes && <p><em>{log.notes}</em></p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymbolicMemoryViewer;
