export interface SymbolicTrait {
  time: string;
  symbol: string;
}

export interface TradeAction {
  time: string;
  type: 'BUY' | 'SELL';
  amount: number;
}

export class MirrorDriftEngine {
  static getDriftMarkdown(): string {
    return [
      '# Mirror Drift Report',
      '',
      '- identity stable',
      '- loop_trigger drift: +2',
      '- pattern_repeat drift: +3',
    ].join('\n');
  }

  static getTimeline(): SymbolicTrait[] {
    return [
      { time: '04:50', symbol: 'identity' },
      { time: '04:51', symbol: 'loop_trigger' },
      { time: '04:52', symbol: 'pattern_repeat' },
      { time: '04:53', symbol: 'conflict' },
      { time: '04:54', symbol: 'outer_loop' },
      { time: '04:55', symbol: 'inner_loop' },
      { time: '04:56', symbol: 'wrong_symbol' },
      { time: '04:57', symbol: 'identity' },
      { time: '04:58', symbol: 'loop_trigger' },
      { time: '04:59', symbol: 'pattern_repeat' },
    ];
  }

  static getTradeActions(): TradeAction[] {
    return [
      { time: '04:55', type: 'BUY', amount: 3 },
      { time: '05:00', type: 'SELL', amount: 2 },
      { time: '05:05', type: 'BUY', amount: 1 },
      { time: '05:10', type: 'SELL', amount: 4 },
      { time: '05:15', type: 'BUY', amount: 5 },
    ];
  }
}
