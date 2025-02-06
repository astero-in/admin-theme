import { runCommand, log, logStep } from './utils.mjs';

function lintJS() {
  try {
    log(' ====== Linting process started ====== ', 'info');

    logStep(1, 4, '🔒 Running Lockfile Lint...');
    runCommand('lockfile-lint', [
      '--allowed-hosts', 'npm',
      '--allowed-schemes', 'https:',
      '--empty-hostname', 'false',
      '--type', 'npm',
      '--path', 'package-lock.json'
    ]);
    log('✅ Lockfile lint completed', 'success');

    logStep(2, 4, '📝 Running ESLint...');
    runCommand('eslint', ['--cache', '--cache-location', '.cache/.eslintcache', '--report-unused-disable-directives', '.']);
    log('✅ ESLint completed', 'success');

    logStep(3, 4, '🎨 Running StyleLint...');
    runCommand('stylelint', ['src/scss/**/*.scss', '--cache', '--cache-location', '.cache/.stylelintcache', '--rd']);
    log('✅ StyleLint completed', 'success');
    /* Check about --fix https://stylelint.io/user-guide/options/*/

    logStep(4, 4, '🚀 Running Astro check...');
    runCommand('astro', ['--config', 'src/config/astro.config.mjs', 'check']);
    log('✅ Astro check completed', 'success');

    log('🎉 Linting completed successfully', 'success');
  } catch (error) {
    log('❌ Linting failed', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

export { lintJS };
