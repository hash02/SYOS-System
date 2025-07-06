# SYOS System 🚀

This repository contains the pieces that power the Symbolic Yield Observation System (SYOS). The focus of the project is the DApp frontend and the developer tools used to integrate symbolic memory logic.

## Structure

- `syos_dapp_ui/` – Vite + React dashboard for interacting with SYOS. Includes a small API folder for serverless functions.
- `syos-vscode-extension/` – VS Code extension implementing SYOS features.
- `SYOS_VSCode_Extension_Starter/` – minimal starter extension.
- `syos_recursive_agent/` – TypeScript utilities for loop detection and drift management.
- `syos_mcp_extended/` – documentation for the multi-context processor architecture.
- `SYOS_Copilot_Prompt_Template_Pack/` – prompt templates for Copilot.
- `Full_Copilot_Template_Pack/` – additional examples and hooks.
- `SYOS_Logs/` – sample memory logs.
- `SYOS_Prompt_Template_Integration/` – prompt integration examples.
- `visualizer/` – placeholder for future visualization tools.

## Running the DApp

```bash
cd syos_dapp_ui
npm install        # install dependencies
npm run dev        # start the Vite dev server at http://localhost:5173
```

> **Note**: Run `npm install` in `syos_dapp_ui` before executing `npm run dev` or
> `npm run build`. Vite is the build tool used by this project and is included in
> the `devDependencies` section of `package.json`.

### Serverless functions

Functions placed in `syos_dapp_ui/api` are deployed on Vercel under `/api/*`. To test them locally you can use the Vercel CLI:

```bash
npm install -g vercel  # if not already installed
vercel dev             # run from within syos_dapp_ui
```

Then access endpoints like `http://localhost:3000/api/drift`.

## Codex Command Protocol

🧠 **Base Context**

- Project: SYOS System DApp
- Stack: React + Vite + TypeScript
- Deployment: Vercel (Root: `/syos_dapp_ui`)
- Status: Live at [syos-system-fin.vercel.app](https://syos-system-fin.vercel.app)

🎯 **Current Focus**

- Upgrade UI with active wallet display
- Enable API connection to `/api/spiral`
- Render symbolic memory logs & drift analytics
- Prepare project for future Git branching

🛠️ **Codex**: start by running

```bash
git checkout -b feature/wallet-integration
```

## Production Deployment

Merges to `main` automatically deploy to Vercel using the `Deploy to Vercel` workflow.
Add these repository secrets so the workflow can authenticate:

- `VERCEL_TOKEN` – Vercel access token
- `VERCEL_ORG_ID` – organization ID
- `VERCEL_PROJECT_ID` – project ID for the dashboard

Once configured, pushes to `main` redeploy https://syos-system-fin.vercel.app.

