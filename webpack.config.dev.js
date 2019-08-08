const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'static/js/main.js',
    chunkFilename: 'static/js/[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    hot: true,
    stats: 'minimal',
  },
});
