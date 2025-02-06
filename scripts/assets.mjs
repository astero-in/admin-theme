import { runCommand, log, startSpinner, stopSpinner } from './utils.mjs';

export async function copyAssets() {
  try {
    log(' ====== 📦 Assets copy process started ======', 'info');
    startSpinner('Copying assets...');
    await runCommand('node', ['src/config/assets.config.mjs']);
    stopSpinner('✨ Assets copied successfully');
    // log('🎉 Asset copy process completed', 'success');
  } catch (error) {
    stopSpinner('❌ Asset copy failed', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// copyAssets();
