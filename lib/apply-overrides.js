const chalk = require('chalk');
const fs = require('fs').promises;
const pathModule = require('path');
const IGNORED_FILES = require('../utils/ignoredFiles');

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

    for (const file of files) {
      const relativePath = pathModule.relative(sourcePath, file);
      const targetFilePath = pathModule.resolve(currentDirectory, relativePath);

      // Create required directories if they don't exist
      await fs.mkdir(pathModule.dirname(targetFilePath), { recursive: true });

      // Copy only if the file is not in the ignored list
      if (!IGNORED_FILES.includes(relativePath)) {
        await fs.copyFile(file, targetFilePath, fs.constants.COPYFILE_FICLONE);
        // eslint-disable-next-line no-console
        console.log(
          chalk.green(`Copied: ${file} ${chalk.blue('to')} ${targetFilePath}`),
        );
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(chalk.red.bold('An error occurred:', error.message));
    process.exit(1);
  }
}

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

function getCurrentAppName(currentDirectory) {
  const parts = currentDirectory.split(pathModule.sep);
  return parts[parts.length - 1];
}

module.exports = applyOverrides;
