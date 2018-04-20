var webpack = require('webpack');

module.exports = {
  entry: {
    'index': './js/index.js',
    'vendor': ['jquery', 'velocity-animate']
  },
  // 出力の設定
  output: {
    // 出力するファイル名
    filename: '[name].bundle.js',
    // 出力先のパス
    path: __dirname + '/../js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        loader: "babel-loader",
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
