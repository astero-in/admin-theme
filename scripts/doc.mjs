import { runCommand, log, logStep, startSpinner, stopSpinner } from './utils.mjs';
import { program } from 'commander';

program
  .option('-s, --serve', 'Serve documentation')
  .parse(process.argv);

export async function buildDocs() {
  try {
    log('====== 📚 documentation build process started =====', 'info');

    logStep(1, 2, '🔨 Building documentation...');
    await runCommand('astro', ['--config', 'src/config/astro.config.mjs', 'build']);

    logStep(2, 2, '✨ Formatting HTML...');
    await runCommand('prettier', ['--write', 'dist/pages/**/*.html']);

    log('🎉 Documentation built successfully', 'success');
  } catch (error) {
    log('❌ Documentation build failed', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

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
