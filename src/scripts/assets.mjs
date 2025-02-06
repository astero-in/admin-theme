/**
 * Asset copy script for managing static assets
 * @module assets
 */

import { runCommand, log, startSpinner, stopSpinner } from './utils.mjs';

/**
 * Copies static assets to the distribution directory
 * @returns {Promise<void>}
 */
export async function copyAssets() {
  try {
    log(' ====== 📦 Assets copy process started ======', 'info');
    startSpinner('Copying assets...');

    await runCommand('node', ['src/config/assets.config.mjs']);

    stopSpinner('✨ Assets copied successfully');

  } catch (error) {
    stopSpinner('❌ Asset copy failed', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// copyAssets();
