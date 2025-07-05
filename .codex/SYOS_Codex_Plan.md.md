## ⚙️ SYOS Codex Spiral Flow — Full Setup

### 🗂️ 1. **File Structure You Need (Final Layout)**

pgsql

CopyEdit

`/agentSYOS/ ├── syos_recursive_agent/ │   ├── SpiralTriggerAgent.ts ✅ │   ├── SymbolDriftInjector.ts ✅ │   ├── ResultsVisualizer.tsx ✅ │   ├── SYOS_Agent_Router.ts ✅ │   ├── runSpiral.ts ✅ │   ├── test/RunSpiralTest.ts │   └── tsconfig.json ✅ │ ├── syos-vscode-extension/ │   ├── src/ │   │   ├── extension.ts ✅ │   │   └── logic/memoryManager.ts ✅ │   ├── out/visualizer/ (React build output) ✅ │   └── package.json, tsconfig.json ✅ │ ├── memory.json ✅ ├── README.md ✅ (updated to reflect modules) └── .codex/     └── SYOS_Codex_Plan.md 🆕`

---

### 🧠 2. **SYOS_Codex_Plan.md**

(_Put this in `/agentSYOS/.codex/` to guide Codex_)

md

CopyEdit

``# SYOS Codex Plan – Spiral Mode  ## Symbolic Tasks  1. 🔄 Fix `joinPath` error in syos-vscode-extension/src/extension.ts 2. 🔌 Connect `SpiralTriggerAgent.ts` to `ResultsVisualizer.tsx` 3. 🧪 Test with simulated drift using `SymbolDriftInjector.ts` 4. 📦 Package VS Code extension using `vsce` 5. 🧠 Wire /spiral inject, /spiral visualize commands to output to UI 6. 📊 Validate visualization panel renders output and logs correctly  ## Memory Injection Sample (used by runSpiral.ts) ```json {   "timeline": ["loop-1", "loop-2"],   "driftLogs": [     { "drift": 0.2, "correction": "increase symbolic weight" },     { "drift": -0.3, "correction": "reduce anchor priority" }   ],   "agentActions": [     { "time": "T1", "action": "inject", "rating": 0.9 },     { "time": "T2", "action": "visualize", "rating": 1.0 }   ] }``

yaml

CopyEdit

``---  ### 🧪 3. **Codex Commands To Run** Once this plan is in `.codex/`, go to Codex UI and enter:  #### 🚀 Setup Flow  ```bash Install dependencies Fix TypeScript errors Build React visualizer Package VS Code extension``

#### 🧠 Spiral Agent Flow

bash

CopyEdit

`Run SpiralTriggerAgent with memory.json Visualize drift and timeline in ResultsVisualizer Bind Copilot commands to /spiral inject, /spiral visualize`

#### 🧼 Cleanup

bash

CopyEdit

`Remove node_modules from Git Update .gitignore Commit clean package`