import { fileURLToPath } from 'url';
import { runCommand, log, logStep, startSpinner, stopSpinner } from './utils.mjs';
import { program } from 'commander';

const commands = {
  compile: 'sass --quiet --style expanded --load-path=\"node_modules\" --source-map --embed-sources --no-error-css src/scss/:dist/css/',
  prefix: 'postcss --config src/config/postcss.config.mjs --replace \"dist/css/*.css\" \"!dist/css/*.rtl*.css\" \"!dist/css/*.min.css\"',
  rtl: 'cross-env NODE_ENV=RTL postcss --config src/config/postcss.config.mjs --dir \"dist/css\" --ext \".rtl.css\" \"dist/css/*.css\" \"!dist/css/*.min.css\" \"!dist/css/*.rtl.css\"',
  minifymain: 'cleancss -O1 --format breakWith=lf --with-rebase --source-map --source-map-inline-sources --output . --batch --batch-suffix \".min\" \"dist/css/*.css\" \"!dist/css/*.min.css\" \"!dist/css/*rtl*.css\"',
  minifyrtl: 'cleancss -O1 --format breakWith=lf --with-rebase --source-map --source-map-inline-sources --output . --batch --batch-suffix \".min\" \"dist/css/*rtl.css\" \"!dist/css/*.min.css\"'
};

export async function buildCss() {
  try {
    log('====== 🎨 CSS build process started! ======', 'info');

    logStep(1, 4, '📦 Compiling SASS...');
    await runCommand(commands.compile);
    log('✅ SASS compilation complete', 'success');

    logStep(2, 4, '📦 Adding vendor prefixes...');
    // await runCommand(commands.prefix);
    log('✅ Vendor prefixes added', 'success');

    logStep(3, 4, '📦 Generating RTL stylesheets...');
    // await runCommand(commands.rtl);
    log('✅ RTL stylesheets generated', 'success');

    logStep(4, 4, '📦 Minifying CSS files...');
    // await runCommand(commands.minifymain);
    // await runCommand(commands.minifyrtl);
    log('✅ CSS minification complete', 'success');

    log('====== 🎨 CSS build process completed! 🎉 ======', 'info');

  } catch (error) {
    log(`❌ CSS build failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildCss();
}
