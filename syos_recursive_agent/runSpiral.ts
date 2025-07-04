import { SpiralTriggerAgent, SymbolicMemory } from "./SpiralTriggerAgent";

// Example symbolic memory
const symbolicMemory: SymbolicMemory[] = [
  { anchor: "identity", drift: 0 },
  { anchor: "loop_trigger", drift: 2 },
  { anchor: "pattern_repeat", drift: 3 },
];

const agent = new SpiralTriggerAgent(symbolicMemory);
agent.runSpiral();

// To run the spiral, use the command: npx ts-node runSpiral.ts
