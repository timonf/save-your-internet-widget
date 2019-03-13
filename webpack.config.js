const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'raw-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  target: 'web',
  output: {
    filename: 'syi-widget.js',
    path: path.resolve(__dirname, 'dist')
  }
};