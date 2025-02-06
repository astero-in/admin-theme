import { fileURLToPath } from 'url';
import path from 'path';
import esbuild from 'esbuild';
import { runCommand, log, logStep } from './utils.mjs';

export async function buildJs() {
  try {
    log(' ====== JavaScript build process started ====== ', 'info');

    // Step 1: Compilation
    logStep(1, 2, '📦 Compiling JavaScript...');
    await runCommand('rollup --config src/config/rollup.config.mjs --sourcemap');
    log('✅ JavaScript compilation complete', 'success');

    // Step 2: Minification
    logStep(2, 2, '📦 Minifying JavaScript files...');
    await esbuild.build({
      entryPoints: ['dist/js/adminlte.js'],
      outfile: 'dist/js/adminlte.min.js',
      minify: true,
      sourcemap: true,
      target: ['es2015'],
      // banner: {
      //   js: '/* AdminLTE minified JavaScript file */'
      // }
    });
    log('✅ JavaScript minification complete', 'success');

    log('====== 📦 JavaScript build process completed! 🎉 ======', 'success');

  } catch (error) {
    log('❌ JavaScript processing failed!', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildJs();
}
