import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ignore from "rollup-plugin-ignore";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      plugins: [
        ignore(["src/Rings_7.tsx"]), // Specify the file to ignore
      ],
    },
  },
});
