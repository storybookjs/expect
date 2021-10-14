const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path")

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: "module"
    }
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
  plugins: [
    new CleanWebpackPlugin(),
    new NodePolyfillPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "graceful-fs": "fs",
    },
    fallback: {
      fs: false,
      module: false,
    },
  },
}
