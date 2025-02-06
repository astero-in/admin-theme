/**
 * Main build script that orchestrates the entire build process
 * @module build
 */

import { fileURLToPath } from 'url';
import { log, logStep, logHeader } from './utils.mjs';
import { cleanJS } from './clean.mjs';
import { lintJS } from './lint.mjs';
import { buildDocs } from './doc.mjs';
import { copyAssets } from './assets.mjs';
import { buildCss } from './css.mjs';
import { buildJs } from './js.mjs';

/**
 * Main build process that runs all build steps in sequence
 * Steps:
 * 1. Clean dist directory
 * 2. Run linting
 * 3. Build documentation
 * 4. Copy assets
 * 5. Build CSS
 * 6. Build JavaScript
 */
export async function build() {
  try {
    logHeader('Starting Build Process');
    log('🚀 Starting build process...', 'info');

    const totalSteps = 6;
    const steps = [
      { name: '🗑️  Cleaning dist directory...', fn: cleanJS },
      { name: '🔨 Running linting...', fn: lintJS },
      { name: '🔨 Building Astro Docs...', fn: buildDocs },
      { name: '📦 Copying Assets...', fn: copyAssets },
      { name: '🎨 Building CSS...', fn: buildCss },
      { name: '🔨 Building JavaScript...', fn: buildJs }
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      logStep(i + 1, totalSteps, step.name);
      await step.fn();
    }

    logHeader('Build Process Completed Successfully! 🎉');
    log('🚀 Run `npm run serve` to preview the site', 'info');

  } catch (error) {
    log('❌ Build process failed!', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// Execute build if script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  build();
}
