import { SymbolicDecayManager } from './SymbolicDecayManager';

/**
 * SpiralTriggerAgent.ts
 * Detects symbolic loops and triggers corrective actions
 */

export interface SymbolicMemory {
  anchor: string;
  drift: number;
}

export class SpiralTriggerAgent {
  private logger: (msg: string) => void = console.log;
  private memoryInjector: (anchor: string, data: any) => void = () => {};

  constructor(private memory: SymbolicMemory[]) {}

  detectLoop(input: string): boolean {
    // Basic pattern recognition for recursion
    return input.includes("loop") || input.includes("again");
  }

  triggerCorrection(input: string): string {
    if (this.detectLoop(input)) {
      return "[SpiralTriggerAgent] Detected symbolic loop. Triggering correction...";
    }
    return "[SpiralTriggerAgent] Input stable. No correction needed.";
  }

  setLogger(logger: (msg: string) => void) {
    this.logger = logger;
  }

  setMemoryInjector(memoryInjector: (anchor: string, data: any) => void) {
    this.memoryInjector = memoryInjector;
  }

  detectLoops(memory: SymbolicMemory[]): boolean {
    this.logger("🔄 Detecting recursive loops...");
    // Example: detect anchors with drift > 1
    const loops = memory.filter((item: SymbolicMemory, i: number) => {
      if (item.drift > 1) {
        this.logger(`Drift detected at index ${i}: anchor="${item.anchor}", drift=${item.drift}`);
        this.memoryInjector("loop_detected", { index: i, anchor: item.anchor, drift: item.drift });
        return true;
      }
      return false;
    });
    if (loops.length > 0) {
      this.logger("Loops detected: " + JSON.stringify(loops));
      this.memory = memory;
      return true;
    }
    this.logger("No loops detected.");
    return false;
  }

  correctDrift(): void {
    this.logger("🛠 Correcting symbolic drift...");
    if (!this.memory) {
      this.logger("No memory loaded. Run detectLoops first.");
      return;
    }
    this.memory = this.memory.map((item: SymbolicMemory) => ({ ...item, drift: 0 }));
    this.logger("Drift corrected: " + JSON.stringify(this.memory));
  }

  runSpiral(): void {
    this.logger("[SpiralTriggerAgent] Starting spiral loop detection and correction...");
    const decayManager = new SymbolicDecayManager(this.memory);
    decayManager.applyDecay(0.5); // Decay rate can be adjusted
    this.logger("Applied symbolic decay before loop detection.");
    if (this.detectLoops(this.memory)) {
      this.correctDrift();
    } else {
      this.logger("No spiral loop detected. No correction needed.");
    }
  }
}
