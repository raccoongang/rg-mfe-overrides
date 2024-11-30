/**
 * A list of files and directories to be ignored during processing.
 *
 * This array contains the names of files and directories that should not be included
 * in operations such as copying, listing, or processing files in the project.
 *
 * @type {string[]}
 */
const IGNORED_FILES = ['package.json', 'package-lock.json', 'frontend-build'];

module.exports = IGNORED_FILES;
