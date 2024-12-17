#!/usr/bin/env node
const chalk = require('chalk');

const commit = require('../lib/commit');
const listChanges = require('../lib/list-changes');
const applyOverrides = require('../lib/apply-overrides');
const installFrontendBuild = require('../lib/install-frontend-build');

/**
 * A CLI tool for managing micro-frontend (MFE) operations such as committing changes,
 * listing changes, applying overrides, and installing frontend-build.
 *
 * Supported Commands:
 * - `commit <path>`: Commits changes in the specified directory.
 * - `list-changes`: Lists all changes in the repository.
 * - `apply-overrides <path>`: Applies override files from the specified path.
 * - `install-frontend-build <git_repo_url>`: Installs frontend-build from the provided Git URL.
 * - `help`: Displays this help message with a list of available commands.
 */

const [command, argument] = process.argv.slice(2);

switch (command) {
  case 'commit':
    if (!argument) {
      // eslint-disable-next-line no-console
      console.log(
        chalk.red.bold('Error: Path is required. Usage: mfe-cli commit <path>'),
      );
      process.exit(1);
    }
    commit(argument);
    break;

  case 'list-changes':
    listChanges();
    break;

  case 'apply-overrides':
    if (!argument) {
      // eslint-disable-next-line no-console
      console.log(
        chalk.red.bold(
          'Error: Path is required. Usage: mfe-cli apply-overrides <path>',
        ),
      );
      process.exit(1);
    }
    applyOverrides(argument);
    break;

  case 'install-frontend-build':
    if (!argument) {
      // eslint-disable-next-line no-console
      console.log(
        chalk.red.bold(
          'Error: Git URL is required. Usage: mfe-cli install-frontend-build <git_repo_url>',
        ),
      );
      process.exit(1);
    }
    installFrontendBuild(argument);
    break;

  case 'help':
    // eslint-disable-next-line no-console
    console.log(chalk.green.bold('MFE Overrides CLI Help:'));
    // eslint-disable-next-line no-console
    console.log(`
  Available commands:
  ${chalk.blue('commit <path>')}:
    Commits changes in the frontend-build/overrides directory. 
    Use this command in a MFE directory containing changes you want to commit.

  ${chalk.blue('list-changes')}:
    Lists all changes in the MFE directory.
    Use this command in the root directory of the MFE to display all uncommitted changes.

  ${chalk.blue('apply-overrides <path>')}:
    Applies override files from frontend-build/overrides directory.
    Use this command in a MFE project where overrides need to be applied.

  ${chalk.blue('install-frontend-build <git_repo_url>')}:
    Installs frontend-build from the provided Git URL.
    Use this command in the root directory of your MFE to fetch and set up the latest or custom version of frontend-build.

  ${chalk.blue('help')}:
    Displays this help message with a list of available commands.
    `);
    break;

  default:
    // eslint-disable-next-line no-console
    console.log(
      chalk.red.bold(
        `Error: Unknown command '${command}'. Usage: mfe-cli help for a list of commands.`,
      ),
    );
    process.exit(1);
}
