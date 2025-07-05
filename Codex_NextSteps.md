### 📁 Codex_NextSteps.md

> ✅ **SYOS DApp – Phase 2 Onward: Implementation Guide for Wallet + Memory + Drift + Actions Panel**

---

## 🔹 Project Structure

```bash
/                             (root)
/syos_dapp_ui/                (main Vite React frontend)
/syos_backend_api/            (optional backend logic)
/syos-vscode-extension/       (VS Code extension, optional)
/.gitignore                   (must include node_modules)
/package.json                 (keep only if shared config)
```

---

## ✅ Phase 1: Complete Wallet UI (ETH + ERC20)

**File:** `syos_dapp_ui/src/components/WalletDisplay.tsx`

- [x] Show connected address (done ✅)
- [ ] Add balance fetching:

```ts
const balance = await provider.getBalance(account);
const ethBalance = ethers.utils.formatEther(balance);
```

- [ ] Add ERC20 fetch:

```ts
// Fetch list of common tokens with contract addresses
// Use `ethers.Contract` with ERC20 ABI for balanceOf
```

- [ ] Display network name:

```ts
const network = await provider.getNetwork();
console.log(network.name); // 'mainnet', 'goerli', etc.
```

---

## ✅ Phase 2: Implement `/api/memory` Endpoint

**Folder (backend):** `/syos_backend_api/memory.ts`

- [ ] `GET /api/memory` → return memory snapshot log
- [ ] `POST /api/memory` → accept `{ anchor, value, timestamp }`
- [ ] Add localStorage fallback if wallet disconnected

Frontend: update `MemoryLog.tsx` to fetch & display entries.

---

## ✅ Phase 3: Upgrade `DriftChart`

**File:** `syos_dapp_ui/src/components/DriftChart.tsx`

- [ ] Replace placeholder data:

```ts
const driftData = await fetch('/api/drift').then(res => res.json());
```

- [ ] Auto-refresh every 10s
- [ ] Tooltip: show anchor influence or drift source

Use `chart.js` or `recharts`.

---

## ✅ Phase 4: Add Control Panel (SYOS Actions)

**File:** `syos_dapp_ui/src/components/ControlPanel.tsx`

- [ ] New symbolic memory loop trigger
- [ ] Inject trait mutations
- [ ] Export current state to `.json` or `.md`
- [ ] Submit mirror prompts

Optional: floating sidebar or left drawer layout.

---

## ⚠️ Critical Git Fixes

- [ ] Remove `node_modules` from Git:

```bash
git rm -r --cached node_modules syos-vscode-extension/node_modules
echo "node_modules/" >> .gitignore
git add .gitignore
git commit -m "Remove node_modules from tracking"
git push origin main
```

- [ ] Align or remove root `package.json` if React conflicts:

```bash
# Or match versions in root and syos_dapp_ui
"react": "^18.2.0",
"react-dom": "^18.2.0"
```

---

## 🪄 Deployment Instructions

- Always deploy from **feature/** or **deploy/** branch
- Example: `feature/wallet-memory-chart`

```bash
git checkout -b feature/wallet-memory-chart
git commit -am "Add wallet + memory + chart logic"
git push origin feature/wallet-memory-chart
```

- Open PR → merge → Vercel auto-deploys

---

## ✅ Codex Task Summary

| Task # | Description                                  | Status |
|--------|----------------------------------------------|--------|
| 1      | Add ETH + ERC20 balance to wallet UI         | ⏳      |
| 2      | Create `/api/memory` endpoint + localStore   | ⏳      |
| 3      | Replace DriftChart with live data            | ⏳      |
| 4      | Build symbolic control panel                 | ⏳      |
| 5      | Fix Git ignores + remove `node_modules`      | ✅      |
| 6      | Clean React versions in monorepo             | ✅ / ⏳ |

---
