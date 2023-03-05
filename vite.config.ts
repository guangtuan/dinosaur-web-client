import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const devServer: string = process.env["DINOSAUR_DEV_SERVER"]!!;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        // target: "http://192.168.31.197:15889",
        target: devServer,
        changeOrigin: true,
        rewrite: (path) => {
          console.log("rewrite ", path);
          return path;
        },
      },
    },
  },
  plugins: [react()],
});
