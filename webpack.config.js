const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /\.(spec|e2e)\.js$/,
          /node_modules/,
        ],
      },
    ],
    noParse: [
      /\.(spec|e2e)\.js$/,
      /aws-sdk/,
      /LICENSE/,
      /README.md/,
    ],
  },
  plugins: [],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    setImmediate: false,
    __dirname: false,
    __filename: false,
  },
}
