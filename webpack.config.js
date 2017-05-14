var webpack = require('webpack')
var PROD = (process.env.NODE_ENV === 'production')
console.log('------', process.env.NODE_ENV, '------');
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: PROD ? './dist/bundle.js' : 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  plugins: PROD ? [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ] : [],
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
}
