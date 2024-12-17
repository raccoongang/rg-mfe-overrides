const chalk = require('chalk');
const fs = require('fs').promises;
const pathModule = require('path');

const getChangedFiles = require('../utils/getChangedFiles');
const IGNORED_FILES = require('../utils/ignoredFiles');

/**
 * Copies changed files to a specified target directory, preserving the directory structure.
 *
 * This function retrieves the list of changed files in the current working directory,
 * ensures that the target directories exist, and copies the changed files to the specified
 * target path, excluding files listed in `IGNORED_FILES`.
 *
 * @param {string} targetPath - The destination path where changed files should be copied.
 * @returns {Promise<void>} Resolves when the commit process is complete.
 */
async function commit(targetPath) {
  const currentDirectory = process.cwd();
  const parentDirectory = pathModule.dirname(currentDirectory);
  const sourcePath = pathModule.resolve(parentDirectory);

  // eslint-disable-next-line no-console
  console.log(chalk.blue(`Committing changes from ${sourcePath} to ${targetPath}`));

  getChangedFiles(async (changedFiles) => {
    if (changedFiles.length === 0) {
      // eslint-disable-next-line no-console
      console.log(chalk.yellow('No changes to commit.'));
    } else {
      await Promise.all(
        changedFiles.map(async (file) => {
          const absoluteSourcePath = pathModule.resolve(file);
          const relativePath = pathModule.relative(sourcePath, absoluteSourcePath);
          const targetFilePath = pathModule.resolve(targetPath, relativePath);

          // Create required directories if they don't exist
          await fs.mkdir(pathModule.dirname(targetFilePath), { recursive: true });

          // Copy only if the file is not in the ignored list
          if (!IGNORED_FILES.includes(file)) {
            await fs.copyFile(absoluteSourcePath, targetFilePath);
            // eslint-disable-next-line no-console
            console.log(chalk.green(`Copied: ${file} ${chalk.blue('to')} ${targetFilePath}`));
          }
        }),
      );
    }
  });
}

module.exports = commit;
