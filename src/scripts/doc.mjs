/**
 * Documentation build and serve script
 * @module doc
 */

import { runCommand, log, logStep } from './utils.mjs';
import { program } from 'commander';

program
  .option('-s, --serve', 'Serve documentation')
  .parse(process.argv);

/**
 * Builds the documentation site using Astro
 * @returns {Promise<void>}
 */
export async function buildDocs() {
  try {
    log('====== 📚 documentation build process started =====', 'info');

    const steps = [
      {
        name: '🔨 Building documentation...',
        fn: async () => {
          await runCommand('astro', ['--config', 'src/config/astro.config.mjs', 'build']);
        }
      },
      {
        name: '✨ Formatting HTML...',
        fn: async () => {
          await runCommand('prettier', ['--write', 'dist/pages/**/*.html']);
        }
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      logStep(i + 1, steps.length, step.name);
      await step.fn();
    }

    log('🎉 Documentation built successfully', 'success');
  } catch (error) {
    log('❌ Documentation build failed', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

/**
 * Starts the documentation development server
 * @returns {Promise<void>}
 */
export async function serveDocs() {
  try {
    log('🚀 Starting documentation server...', 'info');
    await runCommand('astro', ['--config', 'src/config/astro.config.mjs', 'dev', '--open', '--port', '3000']);
  } catch (error) {
    log('❌ Documentation server failed', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// if (program.opts().serve) {
//   serveDocs();
// } else {
//   buildDocs();
// }
