'use strict';

module.exports = {
  externals: {
    mobx: 'mobx'
  },
  module: {
    rules: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  entry: './src/index.js',
  output: {
    library: 'mobx-storage',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js']
  }
};
