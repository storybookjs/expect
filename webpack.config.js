const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    libraryTarget: "module",
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: {
        condition: /^\**!|@license/i,
        filename: 'LICENSE',
        banner: false,
      },
      terserOptions: {
        ecma: 2020,
      }
    })],
    moduleIds: "named",
    chunkIds: "named",
  },
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    alias: {
      "graceful-fs": "fs",
    },
    fallback: {
      fs: false,
      module: false,
    },
  },
}
