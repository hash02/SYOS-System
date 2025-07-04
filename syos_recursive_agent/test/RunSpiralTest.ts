import { SpiralTriggerAgent, SymbolicMemory } from '../SpiralTriggerAgent';
import { SymbolDriftInjector } from '../SymbolDriftInjector';

// Inject drift patterns for testing
let symbolicMemory: SymbolicMemory[] = [
  { anchor: 'identity', drift: 0 },
  { anchor: 'loop_trigger', drift: 2 },
  { anchor: 'pattern_repeat', drift: 3 },
];

symbolicMemory = SymbolDriftInjector.injectConflictingAnchors(symbolicMemory);
symbolicMemory = SymbolDriftInjector.injectLoopNesting(symbolicMemory);
symbolicMemory = SymbolDriftInjector.injectWrongSymbols(symbolicMemory);

const agent = new SpiralTriggerAgent(symbolicMemory);

// Collect logs for visualization
type DriftLog = { time: string; anchor: string; drift: number; correction?: string };
const driftLogs: DriftLog[] = [];

agent.setLogger((msg: string) => {
  console.log(msg);
  // Simple log extraction for drift events
  const driftMatch = msg.match(/index (\d+): anchor="([^"]+)", drift=(\d+)/);
  if (driftMatch) {
    driftLogs.push({
      time: new Date().toISOString(),
      anchor: driftMatch[2],
      drift: parseInt(driftMatch[3]),
    });
  }
  const correctionMatch = msg.match(/Drift corrected: (.+)/);
  if (correctionMatch) {
    driftLogs.push({
      time: new Date().toISOString(),
      anchor: 'all',
      drift: 0,
      correction: 'All drift reset to 0',
    });
  }
});

agent.runSpiral();

// Export driftLogs for visualization
export { driftLogs };
