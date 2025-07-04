import React from "react";

interface DriftLog {
  time: string;
  anchor: string;
  drift: number;
  correction?: string;
}

interface AgentAction {
  time: string;
  action: string;
  rating?: number;
}

interface ResultsVisualizerProps {
  timeline: string[];
  driftLogs: DriftLog[];
  agentActions: AgentAction[];
}

export const ResultsVisualizer: React.FC<ResultsVisualizerProps> = ({ timeline, driftLogs, agentActions }) => (
  <div style={{ fontFamily: 'monospace', padding: 20 }}>
    <h2>🕰 Timeline of Trait Anchors</h2>
    <ul>
      {timeline.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
    <h2>📉 Drift Logs & Auto-Corrections</h2>
    <ul>
      {driftLogs.map((log, i) => (
        <li key={i}>
          [{log.time}] Anchor: <b>{log.anchor}</b>, Drift: {log.drift}
          {log.correction && <span> — Correction: <span style={{ color: 'green' }}>{log.correction}</span></span>}
        </li>
      ))}
    </ul>
    <h2>🤖 Agent Actions</h2>
    <ul>
      {agentActions.map((a, i) => (
        <li key={i}>
          [{a.time}] Action: <b>{a.action}</b>{a.rating !== undefined && <span> — Rating: {a.rating}</span>}
        </li>
      ))}
    </ul>
  </div>
);
