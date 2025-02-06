import { fileURLToPath } from 'url';
import { runCommand, log, logStep, logHeader } from './utils.mjs';
import { cleanJS } from './clean.mjs';
import { lintJS } from './lint.mjs';
import {buildDocs} from './doc.mjs';
import { copyAssets } from './assets.mjs';
import { buildCss } from './css.mjs';
import { buildJs } from './js.mjs';


export async function build() {
  try {
    logHeader('Starting Build Process');

    log('🚀 Starting build process...', 'info');

    const totalSteps = 6;

    logStep(1, totalSteps, '🗑️  Cleaning dist directory...');
    await cleanJS();

    logStep(2, totalSteps, '🔨 Running linting...');
    await lintJS();
    log('✨ All Lint Checks completed', 'success');

    logStep(3, totalSteps, '🔨 Building Astro Docs...');
    await buildDocs();

    logStep(4, totalSteps, '📦 Copying Assets...');
    await copyAssets();

    logStep(5, totalSteps, '🎨 Building CSS...');
    await buildCss();

    logStep(6, totalSteps, '🔨 Building JavaScript...');
    await buildJs();
    log('✨ JavaScript build completed', 'success');

    logHeader('Build Process Completed Successfully! 🎉');

    log('🚀 Run `npm run serve` to preview the site', 'info');

  } catch (error) {
    log('❌ Build process failed!', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// Check if file is being run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  build();
}
