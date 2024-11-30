const simpleGit = require('simple-git');

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
