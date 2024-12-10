const chalk = require('chalk');
const fs = require('fs').promises;
const pathModule = require('path');

const IGNORED_FILES = require('../utils/ignoredFiles');

/**
 * Retrieves the name of the current application based on the working directory.
 *
 * @param {string} currentDirectory - The current working directory.
 * @returns {string} The name of the current application.
 */
function getCurrentAppName(currentDirectory) {
  const parts = currentDirectory.split(pathModule.sep);
  return parts[parts.length - 1];
}

/**
 * Recursively retrieves all file paths within a directory.
 *
 * @param {string} dir - The directory to traverse.
 * @returns {Promise<string[]>} A promise that resolves to an array of file paths.
 */
async function getAllFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = pathModule.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getAllFiles(res) : res;
    }),
  );
  return files.flat();
}

async function applyOverrides(overridesPath) {
  const currentDirectory = process.cwd();
  const currentAppName = getCurrentAppName(currentDirectory);

  const sourcePath = pathModule.resolve(
    currentDirectory,
    overridesPath,
    currentAppName,
  );

  console.log(chalk.blue(`Applying changes from ${sourcePath}`)); // eslint-disable-line no-console

  try {
    const files = await getAllFiles(sourcePath);

    files.forEach(async (file) => {
      const relativePath = pathModule.relative(sourcePath, file);
      const targetFilePath = pathModule.resolve(currentDirectory, relativePath);

      // Create required directories if they don't exist
      await fs.mkdir(pathModule.dirname(targetFilePath), { recursive: true });

      // Copy only if the file is not in the ignored list
      if (!IGNORED_FILES.includes(relativePath)) {
        await fs.copyFile(file, targetFilePath);
        // eslint-disable-next-line no-console
        console.log(
          chalk.green(`Copied: ${file} ${chalk.blue('to')} ${targetFilePath}`),
        );
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(chalk.red.bold('An error occurred:', error.message));
    process.exit(1);
  }
}

module.exports = applyOverrides;
