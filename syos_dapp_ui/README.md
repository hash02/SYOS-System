# SYOS Dashboard

This React + TypeScript project provides a simple dashboard with wallet connect functionality, a memory log placeholder and a drift chart placeholder. It is configured with Vite for development and bundling and includes a minimal Vercel config for deployment.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The output in `dist/` can be deployed to any static host. The included `vercel.json` rewrites all routes to `index.html` for single page routing on Vercel.
