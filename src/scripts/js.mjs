/**
 * JavaScript build script for compiling and minifying
 * @module js
 */

import { fileURLToPath } from 'url';
import path from 'path';
import esbuild from 'esbuild';
import { runCommand, log, logStep } from './utils.mjs';

/**
 * Builds JavaScript files through multiple steps:
 * 1. Compilation with Rollup
 * 2. Minification with esbuild
 * @returns {Promise<void>}
 */
export async function buildJs() {
  try {
    log(' ====== JavaScript build process started ====== ', 'info');

    const steps = [
      {
        name: '📦 Compiling JavaScript...',
        fn: async () => {
          await runCommand('rollup --config src/config/rollup.config.mjs --sourcemap');
          log('✅ JavaScript compilation complete', 'success');
        }
      },
      {
        name: '📦 Minifying JavaScript files...',
        fn: async () => {
          await esbuild.build({
            entryPoints: ['dist/js/adminlte.js'],
            outfile: 'dist/js/adminlte.min.js',
            minify: true,
            sourcemap: true,
            target: ['es2015']
          });
          log('✅ JavaScript minification complete', 'success');
        }
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      logStep(i + 1, steps.length, step.name);
      await step.fn();
    }

    log('====== 📦 JavaScript build process completed! 🎉 ======', 'success');

  } catch (error) {
    log('❌ JavaScript processing failed!', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// Execute JS build if script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildJs();
}
