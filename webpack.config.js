const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    libraryTarget: 'module',
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
  resolve: {
    alias: {
      'graceful-fs': 'fs'
    },
    fallback: {
      fs: false,
      module: false
    }
  }
};
