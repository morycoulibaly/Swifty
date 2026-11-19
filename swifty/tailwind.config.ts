import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { lin: "#F4F1EA", lin2: "#EAE4D7", encre: "#1C1B19", pierre: "#6E6A63", terra: "#C85A32", terra2: "#A84623" },
      fontFamily: { display: ["var(--font-display)", "serif"], body: ["var(--font-body)", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
