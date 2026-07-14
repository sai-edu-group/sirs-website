// @ts-check
// MODULES //
import nodePath from "path";

// OTHERS //
import { defineConfig, passthroughImageService } from "astro/config";
import astroIcon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

const __dirname = nodePath.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: "https://www.sairesidentialschool.com/",
  integrations: [astroIcon(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": nodePath.resolve(__dirname, "./src"),
      },
    },
  },
  image: {
    service: passthroughImageService(),
  },
});
