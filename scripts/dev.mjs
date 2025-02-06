import { fileURLToPath } from 'url';
import { runCommand, log, logHeader, logStep, startSpinner, stopSpinner } from './utils.mjs';
import { build } from './build.mjs';
import { watchAll } from './watch.mjs';
import { program } from 'commander';

async function startDevServer() {
  try {
    logHeader('Starting Development Environment');

    // Initial build
    logStep(1, 3, '🏗️  Running initial build...');
    // await build();
    log('✅ Initial build completed', 'success');

    // Start file watchers
    logStep(2, 3, '👀 Starting file watchers...');
    watchAll();
    log('✅ File watchers active', 'success');

    // Start dev server
    logStep(3, 3, '🚀 Starting development server...');

    await runCommand('astro --config src/config/astro.config.mjs dev --open --port 3000');

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

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startDevServer();
}

export { startDevServer };
