export interface TraitEntry {
  timestamp: number;
  price: number;
  trait: string;
}

export type Coin = 'BTC' | 'ETH' | 'SOL';

export const traitLog: Record<Coin, TraitEntry[]> = {
  BTC: [],
  ETH: [],
  SOL: [],
};

export function addTrait(coin: Coin, price: number, trait: string, timestamp = Date.now()) {
  traitLog[coin].push({ timestamp, price, trait });
}

export function getHistory(coin: Coin): TraitEntry[] {
  return traitLog[coin];
}

// mock data for in-memory tests
function seedMockData() {
  const now = Date.now();
  ['BTC', 'ETH', 'SOL'].forEach((c, idx) => {
    const coin = c as Coin;
    for (let i = 0; i < 10; i++) {
      addTrait(
        coin,
        100 + idx * 50 + Math.random() * 10,
        i % 2 === 0 ? 'bullish' : 'bearish',
        now - (10 - i) * 60000
      );
    }
  });
}
seedMockData();
