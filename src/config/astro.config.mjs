import { defineConfig } from 'astro/config'
import icon from "astro-icon";
import * as tabler from "@iconify-json/tabler";

// https://astro.build/config
export default defineConfig({
  integrations: [icon({ collections: { tabler } })],
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  },
  srcDir: './src/html',
  cacheDir: './dist/pages',
  outDir: './dist/pages',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          logger: {
            warn: () => {}
          }
        }
      }
    },
    server: {
      watch: {
        ignored: ['!**/dist/**'],
      }
    }
  }
})
