import { fileURLToPath } from 'url';
import { runCommand, log, startSpinner, stopSpinner } from './utils.mjs';

export async function serve() {
  try {
    log(' ====== 🚀 Astro Server process started ======', 'info');
    await runCommand('astro --config src/config/astro.config.mjs preview --open --port 3000');

  } catch (error) {
    stopSpinner('❌ Cleanup failed', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

serve();
