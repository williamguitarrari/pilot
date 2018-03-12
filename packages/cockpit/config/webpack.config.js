const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../dist'),
    libraryTarget: 'commonjs2',
    filename: 'cockpit.js',
    sourceMapFilename: 'cockpit.js.map',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin({ sourceMap: true }),
    new CleanWebpackPlugin(['dist']),
  ],
}
