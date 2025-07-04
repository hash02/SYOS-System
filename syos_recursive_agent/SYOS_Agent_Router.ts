import { SpiralTriggerAgent, SymbolicMemory } from './SpiralTriggerAgent';

// Simple symbolic memory store with inject capability
class SymbolicMemoryStore {
  private memory: SymbolicMemory[] = [];
  inject(anchor: string, data: any) {
    this.memory.push({ anchor, drift: data.drift ?? 0 });
    console.log(`[Memory Inject] ${anchor}:`, data);
  }
  getAll() { return this.memory; }
}

function handleCommand(command: string, memoryStore?: SymbolicMemoryStore) {
  if (command === '/trigger SpiralTriggerAgent:start') {
    const symbolicMemory: SymbolicMemory[] = [
      { anchor: 'identity', drift: 0 },
      { anchor: 'loop_trigger', drift: 2 },
      { anchor: 'pattern_repeat', drift: 3 },
    ];
    const agent = new SpiralTriggerAgent(symbolicMemory);
    agent.setLogger((msg: string) => console.log(msg));
    agent.setMemoryInjector((anchor, data) => memoryStore?.inject(anchor, data));
    agent.runSpiral();
  }
}

export { handleCommand, SymbolicMemoryStore };
