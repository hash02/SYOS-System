import { SymbolicMemory } from "./SpiralTriggerAgent";

export class SymbolicDecayManager {
  constructor(private memory: SymbolicMemory[]) {}

  applyDecay(decayRate: number): void {
    this.memory = this.memory.map((anchor) => {
      const originalDrift = anchor.drift;
      const newDrift = Math.max(0, anchor.drift - decayRate);
      console.log(
        `[SymbolicDecayManager] ${anchor.anchor} drift decayed from ${originalDrift} to ${newDrift}`
      );
      return { ...anchor, drift: newDrift };
    });
  }

  getLowInfluenceAnchors(threshold: number): SymbolicMemory[] {
    return this.memory.filter((anchor) => anchor.drift < threshold);
  }
}
