import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Mocked drift data based on Codex plan example
  const data = {
    timeline: ['loop-1', 'loop-2'],
    driftLogs: [
      { drift: 0.2, correction: 'increase symbolic weight' },
      { drift: -0.3, correction: 'reduce anchor priority' }
    ],
    agentActions: [
      { time: 'T1', action: 'inject', rating: 0.9 },
      { time: 'T2', action: 'visualize', rating: 1.0 }
    ]
  };

  res.status(200).json(data);
}
