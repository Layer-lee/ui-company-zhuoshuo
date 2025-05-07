// webpack.config.js
module.exports = {
  entry: './src/main.js', // Your entry point
  output: {
    // filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    // Add necessary plugins like VueLoaderPlugin if using .vue files
  ],
}
