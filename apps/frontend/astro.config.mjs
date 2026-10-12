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
  // Pages are built ahead of time and served from the CDN; only routes that
  // set `prerender = false` (the API route and blog detail) run on demand.
  output: "static",
  adapter: vercel(),
  srcDir: "./src",
  publicDir: "./public",
  site: "https://www.sairesidentialschool.com/",
  // The dev toolbar's audits re-fetch every image on each DOM change, which
  // floods the Network tab while developing (never ships to production).
  devToolbar: { enabled: false },
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
