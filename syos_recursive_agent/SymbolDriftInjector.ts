import { SymbolicMemory } from "./SpiralTriggerAgent";

export class SymbolDriftInjector {
  static injectConflictingAnchors(memory: SymbolicMemory[]): SymbolicMemory[] {
    // Add two anchors with the same name but different drift
    return [
      ...memory,
      { anchor: "conflict", drift: 2 },
      { anchor: "conflict", drift: 5 },
    ];
  }

  static injectLoopNesting(memory: SymbolicMemory[]): SymbolicMemory[] {
    // Add nested loop anchors
    return [
      ...memory,
      { anchor: "outer_loop", drift: 3 },
      { anchor: "inner_loop", drift: 4 },
    ];
  }

  static injectWrongSymbols(memory: SymbolicMemory[]): SymbolicMemory[] {
    // Add an anchor with an unexpected symbol
    return [
      ...memory,
      { anchor: "wrong_symbol", drift: 7 },
    ];
  }
}
