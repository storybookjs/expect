const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
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
    filename: process.env.ESM ? 'index.mjs' : 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: process.env.ESM ? 'module' : 'commonjs'
    }
  },
  experiments: process.env.ESM ? {
    outputModule: true,
  } : {},
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
