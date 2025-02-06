/**
 * Astro server script for preview documentation
 * @module preview
 */

import { fileURLToPath } from 'url';
import { runCommand, log } from './utils.mjs';

/**
 * Starts the Astro preview server
 * @returns {Promise<void>}
 */
export async function preview() {
  try {
    log(' ====== 🚀 Astro Server process started ======', 'info');
    await runCommand('astro --config src/config/astro.config.mjs preview --open --port 3000');

  } catch (error) {
    log('❌ Server failed to start', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// Execute serve if script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  preview();
}
