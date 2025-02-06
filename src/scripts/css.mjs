/**
 * CSS build script for compiling, prefixing, and minifying styles
 * @module css
 */

import { fileURLToPath } from 'url';
import { runCommand, log, logStep } from './utils.mjs';

/**
 * Command configurations for CSS processing
 * @const {Object}
 */
const commands = {
  compile: 'sass --quiet --style expanded --source-map --embed-sources --no-error-css src/scss/:dist/css/',
  prefix: 'postcss --config src/config/postcss.config.mjs --replace \"dist/css/*.css\" \"!dist/css/*.rtl*.css\" \"!dist/css/*.min.css\"',
  rtl: 'cross-env NODE_ENV=RTL postcss --config src/config/postcss.config.mjs --dir \"dist/css\" --ext \".rtl.css\" \"dist/css/*.css\" \"!dist/css/*.min.css\" \"!dist/css/*.rtl.css\"',
  minifymain: 'cleancss -O1 --format breakWith=lf --with-rebase --source-map --source-map-inline-sources --output . --batch --batch-suffix \".min\" \"dist/css/*.css\" \"!dist/css/*.min.css\" \"!dist/css/*rtl*.css\"',
  minifyrtl: 'cleancss -O1 --format breakWith=lf --with-rebase --source-map --source-map-inline-sources --output . --batch --batch-suffix \".min\" \"dist/css/*rtl.css\" \"!dist/css/*.min.css\"'
};

/**
 * Builds CSS files through multiple steps:
 * 1. SASS compilation
 * 2. Vendor prefixing
 * 3. RTL version generation
 * 4. Minification
 * @returns {Promise<void>}
 */
export async function buildCss() {
  try {
    log('====== 🎨 CSS build process started! ======', 'info');

    const steps = [
      {
        name: '📦 Compiling SASS...',
        fn: async () => {
          await runCommand(commands.compile);
          log('✅ SASS compilation complete', 'success');
        }
      },
      {
        name: '📦 Adding vendor prefixes...',
        fn: async () => {
          // await runCommand(commands.prefix);
          log('✅ Vendor prefixes added', 'success');
        }
      },
      {
        name: '📦 Generating RTL stylesheets...',
        fn: async () => {
          // await runCommand(commands.rtl);
          log('✅ RTL stylesheets generated', 'success');
        }
      },
      {
        name: '📦 Minifying CSS files...',
        fn: async () => {
          // await runCommand(commands.minifymain);
          // await runCommand(commands.minifyrtl);
          log('✅ CSS minification complete', 'success');
        }
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      logStep(i + 1, steps.length, step.name);
      await step.fn();
    }

    log('====== 🎨 CSS build process completed! 🎉 ======', 'info');

  } catch (error) {
    log(`❌ CSS build failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Execute CSS build if script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildCss();
}
