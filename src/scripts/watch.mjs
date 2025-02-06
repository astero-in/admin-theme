/**
 * File watching script for development
 * @module watch
 */

import { fileURLToPath } from 'url';
import { runCommand, log } from './utils.mjs';
import concurrently from 'concurrently';

/**
 * Command configurations for file watching
 * @const {Object}
 */
const commands = {
  // Watch SCSS files and compile CSS
  cssmain: 'nodemon --watch src/scss/ --ext scss --exec \"npm run css\"',
  // Watch TypeScript files and compile JS
  jsmain: 'nodemon --watch src/ts/ --ext ts --exec \"npm run js\"',
  // Watch CSS files and generate RTL versions
  dist: 'nodemon --watch dist/css/ --ext css --ignore \"dist/css/*.rtl.*\" --exec \"npm run css\"',
  // Watch assets directory for changes
  assets: 'nodemon --watch src/assets/ --exec \"npm run assets\"'
};

/**
 * Starts concurrent file watchers for different file types
 * Watches:
 * - SCSS files for CSS changes
 * - TypeScript files for JS changes
 * - Assets for file changes
 * @returns {Promise<void>}
 */
export async function watchAll() {
  try {
    log('====== 🎨 Watch mode started! ======', 'info');

    const concurrentCommands = [
      {
        command: commands.cssmain,
        name: 'CSS',
        prefixColor: 'blue'
      },
      {
        command: commands.jsmain,
        name: 'JS',
        prefixColor: 'yellow'
      },
      // {
      //   command: commands.dist,
      //   name: 'RTL',
      //   prefixColor: 'green'
      // },
      {
        command: commands.assets,
        name: 'ASSETS',
        prefixColor: 'magenta'
      }
    ];

    const { result } = concurrently(concurrentCommands, {
      prefix: 'name',
      timestampFormat: 'HH:mm:ss',
      restartTries: 3,
      restartDelay: 1000
    });

    result.then(
      () => {
        log('✅ All watchers completed successfully', 'success');
      },
      (err) => {
        log(`❌ Watch process failed: ${err.message}`, 'error');
        process.exit(1);
      }
    );

    // Handle process termination
    process.on('SIGINT', () => {
      log('Shutting down watchers...', 'info');
      process.exit(0);
    });

  } catch (error) {
    log(`❌ Watch process failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Execute watch if script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  watchAll();
}
