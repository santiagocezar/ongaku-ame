import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    target: 'es2022' // para usar el top-level await
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
