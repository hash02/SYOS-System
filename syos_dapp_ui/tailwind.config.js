module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/index.css"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        neon: '#00ffff',
        background: '#0d0d0d',
        card: '#1a1a1a',
        accent: '#ff00ff',
        trade: '#00ff6a',
        drift: '#ff4545',
      },
    },
  },
  plugins: [],
}
