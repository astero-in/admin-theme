/**
 * Script to clean build artifacts and output directories
 * @module clean
 */

import { fileURLToPath } from 'url';
import { runCommand, log, startSpinner, stopSpinner } from './utils.mjs';

/**
 * Cleans the dist directory and other build artifacts
 * @returns {Promise<void>}
 */
export async function cleanJS() {
  try {
    log(' ====== 🗑️ Cleaning process started ====== ', 'info');
    startSpinner('Removing dist directory...');

    await runCommand('rimraf dist');

    stopSpinner('✨ Cleanup completed successfully');
    log(' ====== 🗑️ Cleaning process completed ====== ', 'success');

  } catch (error) {
    stopSpinner('❌ Cleanup failed', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// Execute clean if script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  cleanJS();
}
