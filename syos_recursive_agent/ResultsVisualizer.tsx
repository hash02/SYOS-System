import React, { useEffect, useState } from "react";
import { MirrorDriftEngine, SymbolicTrait, TradeAction } from "./MirrorDriftEngine";

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
  driftLogs: DriftLog[];
  agentActions: AgentAction[];
}

export const ResultsVisualizer: React.FC<ResultsVisualizerProps> = ({ driftLogs, agentActions }) => {
  const [driftMarkdown, setDriftMarkdown] = useState<string>("");
  const [timeline, setTimeline] = useState<SymbolicTrait[]>([]);
  const [trades, setTrades] = useState<TradeAction[]>([]);

  useEffect(() => {
    setDriftMarkdown(MirrorDriftEngine.getDriftMarkdown());
    setTimeline(MirrorDriftEngine.getTimeline());
    setTrades(MirrorDriftEngine.getTradeActions());
  }, []);

  return (
    <div className="font-mono text-neon bg-background p-4 overflow-y-auto h-full">
      <section className="mb-4">
        <h2 className="text-accent mb-2">🕰 Timeline</h2>
        <ul>
          {timeline.slice(-10).map((t, i) => (
            <li key={i} className="mb-1">
              <span className="text-gray-400 mr-2">[{t.time}]</span>
              {t.symbol}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-accent mb-2">📄 Drift Markdown</h2>
        <pre className="bg-card p-2 whitespace-pre-wrap">{driftMarkdown}</pre>
      </section>
      <section className="mb-4">
        <h2 className="text-accent mb-2">📉 Drift Logs & Auto-Corrections</h2>
        <ul>
          {driftLogs.map((log, i) => (
            <li key={i} className="mb-1">
              <span className="text-gray-400 mr-2">[{log.time}]</span>
              Anchor: <b>{log.anchor}</b>, Drift: {log.drift}
              {log.correction && (
                <span>
                  {" "}— Correction: <span className="text-trade">{log.correction}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-accent mb-2">💹 Trades</h2>
        <ul>
          {trades.slice(-5).map((t, i) => (
            <li key={i} className="mb-1">
              <span className="text-gray-400 mr-2">[{t.time}]</span>
              <span className={t.type === 'BUY' ? 'text-trade' : 'text-drift'}>{t.type}</span>
              {" "}{t.amount}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-accent mb-2">🤖 Agent Actions</h2>
        <ul>
          {agentActions.map((a, i) => (
            <li key={i} className="mb-1">
              <span className="text-gray-400 mr-2">[{a.time}]</span>
              Action: <b>{a.action}</b>
              {a.rating !== undefined && <span> — Rating: {a.rating}</span>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
