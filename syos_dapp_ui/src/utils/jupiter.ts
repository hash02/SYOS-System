export interface SwapQuoteParams {
  inputMint: string;
  outputMint: string;
  amount: number;
}

export async function getSwapQuote({ inputMint, outputMint, amount }: SwapQuoteParams) {
  const params = new URLSearchParams({
    inputMint,
    outputMint,
    amount: amount.toString(),
  });
  const res = await fetch(`https://quote-api.jup.ag/v6/quote?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch quote: ${res.status}`);
  }
  return res.json();
}
