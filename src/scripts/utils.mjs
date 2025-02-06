/**
 * Utility functions for build scripts
 * @module utils
 */

import spawn from 'cross-spawn';
import chalk from 'chalk';
import ora from 'ora';

let spinner = null;

/**
 * Executes a command in a child process
 * @param {string} command - The command to run
 * @param {string[]} args - Array of command arguments
 * @param {object} options - Spawn options
 * @returns {Promise} Resolves when command completes successfully
 */
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

/**
 * Logs a message with timestamp and color-coded type
 * @param {string} message - Message to log
 * @param {'info'|'success'|'error'|'warning'} type - Type of message
 */
export function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const timestampStr = chalk.gray(`[${timestamp}]`);

  const icons = {
    success: chalk.green('✓'),
    error: chalk.red('✗'),
    warning: chalk.yellow('⚠'),
    info: chalk.blue('ℹ')
  };

  console.log(`${timestampStr} ${icons[type] || icons.info} ${message}`);
}

/**
 * Logs a step in a multi-step process
 * @param {number} step - Current step number
 * @param {number} total - Total number of steps
 * @param {string} message - Step description
 */
export function logStep(step, total, message) {
  const timestamp = new Date().toLocaleTimeString();
  const timestampStr = chalk.gray(`[${timestamp}]`);
  const stepStr = chalk.cyan(`[${step}/${total}]`);
  console.log(`${timestampStr} ${stepStr} ${message}`);
}

/**
 * Displays a header message with decorative borders
 * @param {string} message - Header message
 */
export function logHeader(message) {
  console.log('\n' + chalk.bold.cyan('='.repeat(50)));
  console.log(chalk.bold.cyan(message));
  console.log(chalk.bold.cyan('='.repeat(50)) + '\n');
}

/**
 * Starts a loading spinner with the given text
 * @param {string} text - Spinner message
 */
export function startSpinner(text) {
  spinner = ora({
    text: chalk.blue(text),
    spinner: 'dots'
  }).start();
}

/**
 * Stops the current spinner with a status message
 * @param {string} text - Completion message
 * @param {'success'|'error'|'warning'|'info'} type - Status type
 */
export function stopSpinner(text, type = 'success') {
  if (!spinner) {
    log(text, type);
    return;
  }

  const methods = {
    success: 'succeed',
    error: 'fail',
    warning: 'warn',
    info: 'info'
  };

  const colors = {
    success: chalk.green,
    error: chalk.red,
    warning: chalk.yellow,
    info: chalk.blue
  };

  spinner[methods[type]](colors[type](text));
  spinner = null;
}
