# SYOS UI Upgrade + Live Drift Data

This document tracks the steps to integrate TailwindCSS and a drift data API into the dashboard.

## Tasks
1. **Install TailwindCSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
   Update `tailwind.config.js`:
   ```js
   module.exports = {
     content: ["./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
       extend: {
         colors: {
           anchor: '#5F4B8B',
           drift: '#FF6B6B',
           base: '#101010',
         },
       },
     },
     plugins: [],
   }
   ```
   Add to `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. **Add Themed Layout** in `App.tsx`
   ```tsx
   <div className="bg-base text-white min-h-screen px-8 py-6">
     <h1 className="text-4xl font-bold text-anchor">SYOS Dashboard</h1>
   </div>
   ```

3. **Create `/api/drift.ts` endpoint**
   ```ts
   export default function handler(req, res) {
     res.status(200).json({
       data: [
         { time: '16:00', value: 0.15 },
         { time: '16:30', value: 0.31 },
         { time: '17:00', value: 0.27 },
       ],
     });
   }
   ```

4. **Fetch data in `DriftChart.tsx`**
   ```tsx
   useEffect(() => {
     fetch('/api/drift')
       .then((res) => res.json())
       .then((json) => setChartData(json.data));
   }, []);
   ```

5. **Verify in the browser**
   - New theme colors are visible.
   - The drift chart lists the fetched data.
