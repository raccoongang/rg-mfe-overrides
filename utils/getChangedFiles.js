const simpleGit = require('simple-git');

/**
 * Retrieves the list of changed files in the Git repository.
 *
 * This function uses the `simple-git` library to fetch the Git status and determine
 * which files have been modified, deleted, or created. It filters out untracked files
 * and other irrelevant statuses, then passes the list of changed files to the provided
 * callback function.
 *
 * @param {function(string[]): void} callback - A callback function that receives the list of changed files.
 */
function getChangedFiles(callback) {
  const git = simpleGit();

  git.status((err, status) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('An error occurred while checking Git status:', err.message);
      process.exit(1);
    }

    const changedFiles = status.files.filter((file) => file.working_dir !== ' ' && file.working_dir !== '?').map((file) => file.path);

    changedFiles.push(...status.created);

    callback(changedFiles);
  });
}

module.exports = getChangedFiles;
