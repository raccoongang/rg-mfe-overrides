const chalk = require('chalk');

const getChangedFiles = require('../utils/getChangedFiles');
const IGNORED_FILES = require('../utils/ignoredFiles');

/**
 * Lists the changed files in the repository, excluding ignored files.
 *
 * This function uses the `getChangedFiles` utility to retrieve a list of changed files,
 * filters out files listed in `IGNORED_FILES`, and logs the remaining files to the console.
 * If no changes are found, a message is displayed indicating this.
 *
 * @returns {void}
 */
function listChanges() {
  // eslint-disable-next-line no-console
  console.log(chalk.blue('Changes in the repository:'));

  getChangedFiles((changedFiles) => {
    // Filter out ignored files
    const filteredFiles = changedFiles.filter((file) => !IGNORED_FILES.includes(file));

    if (filteredFiles.length === 0) {
      // eslint-disable-next-line no-console
      console.log(chalk.yellow('No changes found.'));
    } else {
      filteredFiles.forEach((file) => {
        console.log(`- ${file}`); // eslint-disable-line no-console
      });
    }
  });
}

module.exports = listChanges;
