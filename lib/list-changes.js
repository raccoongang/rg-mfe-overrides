const chalk = require('chalk');
const getChangedFiles = require('../utils/getChangedFiles');
const IGNORED_FILES = require('../utils/ignoredFiles');

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
