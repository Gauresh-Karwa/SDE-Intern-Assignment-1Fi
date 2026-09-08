/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F6F0FF",
          100: "#E9DDFB",
          200: "#D3BBF7",
          500: "#6835BF",
          600: "#4C1D95",
          700: "#3F1876",
          800: "#2E1158",
          gradientFrom: "#6835BF",
          gradientTo: "#4106B7",
        },
        success: "#1EAB54",
        ink: "#0A0A0F",
        muted: "#767679",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(17, 12, 46, 0.06)",
      },
    },
  },
  plugins: [],
};
