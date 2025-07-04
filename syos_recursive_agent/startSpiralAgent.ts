import { SpiralTriggerAgent } from './SpiralTriggerAgent';

// Sample symbolic input for testing
const symbolicMemory = [
  { anchor: "identity", drift: 0 },
  { anchor: "loop_trigger", drift: 2 },
  { anchor: "pattern_repeat", drift: 3 },
];

const spiralAgent = new SpiralTriggerAgent(symbolicMemory);

spiralAgent.detectLoops(symbolicMemory);
spiralAgent.correctDrift();
