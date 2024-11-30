const fs = require('fs');
const path = require('path');
// Webpack is provided by the installed frontend-build package
// and does not need to be a direct dependency of this project.
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

/**
 * Retrieves override file mappings for the current micro-frontend (MFE).
 *
 * This function collects all override files for the current MFE and returns
 * an array of mappings containing the source file path and its corresponding
 * destination path.
 *
 * @returns {Array<{from: string, to: string}>} An array of objects containing `from` (source file path)
 * and `to` (destination file path).
 */
function getOverrides() {
  const currentMfe = path.basename(process.cwd());
  const overridesPath = path.resolve(__dirname, `./overrides/${currentMfe}`);
  const overrides = [];

  function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        const relativePath = path.relative(overridesPath, filePath);
        const originalPath = path.join(process.cwd(), relativePath);
        overrides.push({
          from: filePath,
          to: originalPath,
        });
      } else if (stats.isDirectory()) {
        processDirectory(filePath);
      }
    });
  }

  processDirectory(overridesPath);
  console.log('overrides', overrides); // eslint-disable-line no-console
  return overrides;
}

module.exports = {
  plugins: [...getOverrides().map(({ from, to }) => new webpack.NormalModuleReplacementPlugin(new RegExp(to), from))],
};
