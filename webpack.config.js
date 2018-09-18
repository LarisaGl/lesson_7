'use srtict';

const isDevMode = process.env.NODE_ENV != 'production';
const webpack = require('webpack');
const path = require('path');

const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  module: {
    rules:[
      {
        test: /\.less$/,
        use: [
              isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              'less-loader'
             ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/'
          }
        }
      }
    ]
  },
  watch: true,
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanPlugin(['dist']),
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
