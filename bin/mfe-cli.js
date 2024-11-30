#!/usr/bin/env node
const chalk = require('chalk');
const commit = require('../lib/commit');
const listChanges = require('../lib/list-changes');
const applyOverrides = require('../lib/apply-overrides');
const installFrontendBuild = require('../lib/install-frontend-build');

const [command, argument] = process.argv.slice(2);

switch (command) {
  case 'commit':
    if (!argument) {
      // eslint-disable-next-line no-console
      console.log(chalk.red.bold('Error: Path is required. Usage: mfe-cli commit <path>'));
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
      console.log(chalk.red.bold('Error: Path is required. Usage: mfe-cli apply-overrides <path>'));
      process.exit(1);
    }
    applyOverrides(argument);
    break;

  case 'install-frontend-build':
    if (!argument) {
      // eslint-disable-next-line no-console
      console.log(chalk.red.bold('Error: Git URL is required. Usage: mfe-cli install-frontend-build <git_repo_url>'));
      process.exit(1);
    }
    installFrontendBuild(argument);
    break;

  default:
    // eslint-disable-next-line no-console
    console.log(chalk.red.bold(`Error: Unknown command '${command}'. Usage: mfe-cli <command>`));
    process.exit(1);
}
