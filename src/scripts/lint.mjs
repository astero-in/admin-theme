/**
 * Linting script for code quality checks
 * @module lint
 */

import { fileURLToPath } from 'url';
import { runCommand, log, logStep } from './utils.mjs';

/**
 * Runs all linting processes:
 * 1. Lockfile lint
 * 2. ESLint
 * 3. StyleLint
 * 4. Astro check
 * @returns {Promise<void>}
 */
export async function lintJS() {
  try {
    log(' ====== Linting process started ====== ', 'info');

    const steps = [
      {
        name: '🔒 Running Lockfile Lint...',
        fn: async () => {
          await runCommand('lockfile-lint', [
            '--allowed-hosts', 'npm',
            '--allowed-schemes', 'https:',
            '--empty-hostname', 'false',
            '--type', 'npm',
            '--path', 'package-lock.json'
          ]);
          log('✅ Lockfile lint completed', 'success');
        }
      },
      {
        name: '📝 Running ESLint...',
        fn: async () => {
          await runCommand('eslint', [
            '--cache',
            '--cache-location', '.cache/.eslintcache',
            '--report-unused-disable-directives',
            '.'
          ]);
          log('✅ ESLint completed', 'success');
        }
      },
      {
        name: '🎨 Running StyleLint...',
        fn: async () => {
          await runCommand('stylelint', [
            'src/scss/**/*.scss',
            '--cache',
            '--cache-location', '.cache/.stylelintcache',
            '--rd'
          ]);
          log('✅ StyleLint completed', 'success');
        }
      },
      {
        name: '🚀 Running Astro check...',
        fn: async () => {
          await runCommand('astro', ['--config', 'src/config/astro.config.mjs', 'check']);
          log('✅ Astro check completed', 'success');
        }
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      logStep(i + 1, steps.length, step.name);
      await step.fn();
    }

    log('🎉 Linting completed successfully', 'success');
  } catch (error) {
    log('❌ Linting failed', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// Execute lint if script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  lintJS();
}
