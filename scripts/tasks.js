const { execSync } = require('child_process');
const path = require('path');

// Helper function to execute shell commands
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing: ${command}`);
    process.exit(1);
  }
}

// Define tasks
const tasks = {
  css: () => {
    runCommand('npx stylelint "src/scss/**/*.scss" --cache --cache-location .cache/.stylelintcache --rd');
    runCommand('npx sass --style expanded --load-path="node_modules" --source-map --embed-sources --no-error-css src/scss/:dist/css/');
    runCommand('npx postcss --config src/config/postcss.config.mjs --replace "dist/css/*.css" "!dist/css/*.rtl*.css" "!dist/css/*.min.css"');
    runCommand('npx cross-env NODE_ENV=RTL postcss --config src/config/postcss.config.mjs --dir "dist/css" --ext ".rtl.css" "dist/css/*.css" "!dist/css/*.min.css" "!dist/css/*.rtl.css"');
    runCommand('npx cleancss -O1 --format breakWith=lf --with-rebase --source-map --source-map-inline-sources --output dist/css/ --batch --batch-suffix ".min" "dist/css/*.css" "!dist/css/*.min.css" "!dist/css/*rtl*.css"');
    runCommand('npx cleancss -O1 --format breakWith=lf --with-rebase --source-map --source-map-inline-sources --output dist/css/ --batch --batch-suffix ".min" "dist/css/*rtl.css" "!dist/css/*.min.css"');
  },
  js: () => {
    runCommand('npx eslint --cache --cache-location .cache/.eslintcache --report-unused-disable-directives .');
    runCommand('npx rollup --config src/config/rollup.config.js --sourcemap');
    runCommand('npx terser --compress passes=2 --mangle --comments "/^!/" --source-map "content=dist/js/adminlte.js.map,includeSources,url=adminlte.min.js.map" --output dist/js/adminlte.min.js dist/js/adminlte.js');
  },
  assets: () => {
    runCommand('node src/config/assets.config.mjs');
  },
  lint: () => {
    runCommand('npx npm-run-all --aggregate-output --continue-on-error --parallel js css assets');
  },
  compile: () => {
    runCommand('npx astro --config src/config/astro.config.mjs build');
    runCommand('npx prettier --write "dist/pages/**/*.html"');
    tasks.assets();
    tasks.css();
    tasks.js();
  },
  watch: () => {
    runCommand('npx concurrently "npx nodemon --watch src/scss/ --ext scss --exec \"npx npm-run-all css\"" "npx nodemon --watch dist/css/ --ext css --ignore \"dist/css/*.rtl.*\" --exec \"npx npm run css-rtl\"" "npx nodemon --watch src/ts/ --ext ts --exec \"npx npm-run-all js\"" "npx nodemon --watch src/assets/ --exec \"npx npm run assets\""');
  },
  dev: () => {
    runCommand('npx concurrently "node ' + path.resolve(__filename) + ' watch" "npx astro --config src/config/astro.config.mjs dev --open --port 3000"');
  }
};

// Execute task based on command line argument
const taskName = process.argv[2];
if (taskName && tasks[taskName]) {
  tasks[taskName]();
} else {
  console.error(`Task "${taskName}" not found`);
  process.exit(1);
}

module.exports = tasks;
