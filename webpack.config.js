const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isDevelopment ? 'bundle.js' : 'assets/javascripts/bundle-[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader',
        options: {
          presets: [['es2015', { modules: false }], 'react', 'stage-2']
        }
      },
      {
        test: /.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devtool: isDevelopment && 'cheap-module-eval-source-map',
  devServer: {
    hot: true
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './index.html' }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
