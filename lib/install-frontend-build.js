const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');

/**
 * Checks if a directory exists.
 *
 * @param {string} directoryPath - The path to the directory to check.
 * @returns {Promise<boolean>} Resolves to `true` if the directory exists, otherwise `false`.
 */
async function directoryExists(directoryPath) {
  try {
    await fs.access(directoryPath);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Executes a shell command in a specified working directory.
 *
 * @param {string} command - The shell command to run.
 * @param {string} cwd - The working directory in which to run the command.
 * @returns {Promise<string>} Resolves with the trimmed standard output of the command.
 * Rejects with an error message if the command fails.
 */
function runCommand(command, cwd) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(chalk.red(stderr || error.message));
      } else {
        // eslint-disable-next-line no-console
        console.log(chalk.gray(stdout)); // Log the command output in gray
        resolve(stdout.trim());
      }
    });
  });
}

/**
 * Installs the `@edx/frontend-build` package by cloning its repository,
 * removing the `node_modules` directory if it exists, and installing the package
 * as a local dependency.
 *
 * @param {string} gitRepoUrl - The Git URL of the `frontend-build` repository to clone.
 * @returns {Promise<void>} Resolves when the installation is completed successfully.
 */
async function installFrontendBuild(gitRepoUrl) {
  const cloneDir = 'frontend-build';
  const repoExists = await directoryExists(path.join(process.cwd(), cloneDir));
  const nodeModulesExists = await directoryExists(
    path.join(process.cwd(), 'node_modules'),
  );

  // Skip cloning if the repository already exists
  if (!repoExists) {
    // eslint-disable-next-line no-console
    console.log(
      chalk.blue(`Cloning repository from ${gitRepoUrl} to ${cloneDir}...`),
    );
    try {
      await runCommand(`git clone ${gitRepoUrl} ${cloneDir}`, process.cwd());
      console.log(chalk.green('Repository cloned successfully.')); // eslint-disable-line no-console
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        chalk.red(`Error: Failed to clone the repository. ${error}`),
      );
      process.exit(1);
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow('Repository already exists. Skipping cloning step.'),
    );
  }

  // Skip removing node_modules if it doesn't exist
  if (nodeModulesExists) {
    // eslint-disable-next-line no-console
    console.log(chalk.blue('Removing node_modules directory...'));
    try {
      await fs.rm(path.join(process.cwd(), 'node_modules'), {
        recursive: true,
        force: true,
      });
      // eslint-disable-next-line no-console
      console.log(chalk.green('node_modules directory removed successfully.'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        chalk.yellow(
          'Warning: Failed to remove some files in node_modules directory. Continuing with the installation...',
        ),
      );
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow('node_modules directory not found. Skipping removal step.'),
    );
  }

  // Install @edx/frontend-build
  console.log(chalk.blue('Installing @edx/frontend-build...')); // eslint-disable-line no-console
  try {
    await runCommand(
      `npm install --save-dev @edx/frontend-build@file:./${cloneDir}`,
      process.cwd(),
    );
    // eslint-disable-next-line no-console
    console.log(chalk.green('@edx/frontend-build installed successfully.'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      chalk.red(`Error: Failed to install @edx/frontend-build. ${error}`),
    );
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log(chalk.green('Installation completed successfully.'));
}

module.exports = installFrontendBuild;
