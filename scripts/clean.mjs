import { fileURLToPath } from 'url';
import { runCommand, log, startSpinner, stopSpinner } from './utils.mjs';

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

// Check if file is being run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  cleanJS();
}
