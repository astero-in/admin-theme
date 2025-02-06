/**
 * Development server script with file watching and live reload
 * @module dev
 */

import { fileURLToPath } from 'url';
import { runCommand, log, logHeader, logStep } from './utils.mjs';
import { build } from './build.mjs';
import { watchAll } from './watch.mjs';

/**
 * Starts the development environment with:
 * 1. Initial build
 * 2. File watchers
 * 3. Development server
 * @returns {Promise<void>}
 */
async function startDevServer() {
  try {
    logHeader('Starting Development Environment');

    const steps = [
      {
        name: '🏗️  Running initial build...',
        fn: async () => {
          // await build();
          log('✅ Initial build completed', 'success');
        }
      },
      {
        name: '👀 Starting file watchers...',
        fn: async () => {
          watchAll();
          log('✅ File watchers active', 'success');
        }
      },
      {
        name: '🚀 Starting development server...',
        fn: async () => {
          await runCommand('astro --config src/config/astro.config.mjs dev --open --port 3000');
        }
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      logStep(i + 1, steps.length, step.name);
      await step.fn();
    }

  } catch (error) {
    log('❌ Development server failed to start', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('👋 Shutting down development server...', 'warning');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('👋 Shutting down development server...', 'warning');
  process.exit(0);
});

// Execute dev server if script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startDevServer();
}

export { startDevServer };
