import spawn from 'cross-spawn';
import chalk from 'chalk';
import ora from 'ora';

let spinner = null;

export function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', ...options });

    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Command failed with code ${code}`));
        return;
      }
      resolve();
    });
  });
}

export function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const timestampStr = chalk.gray(`[${timestamp}]`);

  switch (type) {
    case 'success':
      console.log(`${timestampStr} ${chalk.green('✓')} ${message}`);
      break;
    case 'error':
      console.log(`${timestampStr} ${chalk.red('✗')} ${message}`);
      break;
    case 'warning':
      console.log(`${timestampStr} ${chalk.yellow('⚠')} ${message}`);
      break;
    case 'info':
    default:
      console.log(`${timestampStr} ${chalk.blue('ℹ')} ${message}`);
      break;
  }
}

export function logStep(step, total, message) {
  const timestamp = new Date().toLocaleTimeString();
  const timestampStr = chalk.gray(`[${timestamp}]`);
  const stepStr = chalk.cyan(`[${step}/${total}]`);
  console.log(`${timestampStr} ${stepStr} ${message}`);
}

export function logHeader(message) {
  console.log('\n' + chalk.bold.cyan('='.repeat(50)));
  console.log(chalk.bold.cyan(message));
  console.log(chalk.bold.cyan('='.repeat(50)) + '\n');
}

export function startSpinner(text) {
  spinner = ora({
    text: chalk.blue(text),
    spinner: 'dots'
  }).start();
}

export function stopSpinner(text, type = 'success') {
  if (!spinner) {
    log(text, type);
    return;
  }

  switch (type) {
    case 'success':
      spinner.succeed(chalk.green(text));
      break;
    case 'error':
      spinner.fail(chalk.red(text));
      break;
    case 'warning':
      spinner.warn(chalk.yellow(text));
      break;
    default:
      spinner.info(chalk.blue(text));
  }

  spinner = null;
}
