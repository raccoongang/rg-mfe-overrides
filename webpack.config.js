const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

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
