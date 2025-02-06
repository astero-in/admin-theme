import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
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
