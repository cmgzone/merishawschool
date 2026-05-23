import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#000000",
          burgundy: "#7A212E",
          gold: "#D7B98A",
          grey: "#A2A9AE",
          cream: "#F8F1E5",
          line: "#D9DDE0",
          muted: "#5F666B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Cormorant Garamond", "Georgia", "serif"],
      },
      boxShadow: {
        premium: "0 24px 80px rgba(0, 0, 0, 0.12)",
        card: "0 18px 50px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(circle at top left, rgba(215, 185, 138, 0.24), transparent 32rem)",
      },
    },
  },
  plugins: [],
};

export default config;
