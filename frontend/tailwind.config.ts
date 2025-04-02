import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors
        beige: {
          50: "#f5f0e0",
          100: "#ebe1c1",
          200: "#d7c383",
          300: "#c3a545",
          400: "#af8707",
          500: "#9b6900",
          600: "#8b5900",
          700: "#7b4900",
          800: "#6b3900",
          900: "#5b2900",
        },
        green: {
          50: "#f0f2e8",
          100: "#e1e5d1",
          200: "#c3cba3",
          300: "#a5b175",
          400: "#879747",
          500: "#697d19",
          600: "#596d19",
          700: "#495d19",
          800: "#394d19",
          900: "#293d19",
        },
        brown: {
          50: "#f5f0e6",
          100: "#ebe1cc",
          200: "#d7c399",
          300: "#c3a566",
          400: "#af8733",
          500: "#8b5e2f",
          600: "#774e28",
          700: "#633e21",
          800: "#4f2e1a",
          900: "#3b1e13",
        },
        cream: {
          50: "#faf7f2",
          100: "#f5efe5",
          200: "#ebdfcb",
          300: "#e1cfb1",
          400: "#d7bf97",
          500: "#cdaf7d",
          600: "#c39f63",
          700: "#b98f49",
          800: "#af7f2f",
          900: "#a56f15",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

