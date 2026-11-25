import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For local dev with the API, run `npx vercel dev` (it runs Vite + /api together).
export default defineConfig({
  plugins: [react()],
});
