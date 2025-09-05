import type { Config } from "tailwindcss"

export default {
  darkMode: "media", // 또는 "media"
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        header: `var(--header-h)`,
      },
      minHeight: {
        "screen-no-header": `calc(100vh - var(--header-h))`
      },
    },
  },
  plugins: [],
} satisfies Config
