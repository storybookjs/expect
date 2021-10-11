const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const path = require("path")

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: __dirname,
    filename: "index.js",
    libraryTarget: "module",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
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
