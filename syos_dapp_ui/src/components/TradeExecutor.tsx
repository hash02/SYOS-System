import { useEffect, useState } from 'react';
import { getSwapQuote } from '../utils/jupiter';

export default function TradeExecutor() {
  const [quote, setQuote] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSwapQuote({
      inputMint: 'So11111111111111111111111111111111111111112',
      outputMint: 'EPjFWdd5AufqSSqeM2qRFBwtDJewL9aZCLuDHic9xp8',
      amount: 1000000, // 1 SOL (lamports)
    })
      .then(setQuote)
      .catch((e: any) => setError(e.message));
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-2">Swap Quote</h2>
      {error && <p>Error: {error}</p>}
      <pre className="whitespace-pre-wrap break-all text-xs">
        {quote ? JSON.stringify(quote, null, 2) : 'Loading...'}
      </pre>
    </div>
  );
}
