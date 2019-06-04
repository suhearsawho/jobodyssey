const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: __dirname + '/src/index.js',
    error: __dirname + '/src/error-index.js',
    user: __dirname + '/src/user-index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]-bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true
  }
}
