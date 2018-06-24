const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin') ;// here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');


module.exports = {
  // REQUIRED: webpackHotServerMiddleware is expecting two webpack configs,
  // one with a name 'client', one with a name 'server'.
  mode:"development",
  name: 'client',
  // Target browsers for our client config
  target: 'web',
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
        {
            test: /\.css$/,
            use: [
                ExtractCssChunks.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]',
                    },
                },
            ],
        }
    ]
  },
  devtool: 'eval',
    resolve: {
        extensions: ['.js', '.css']
    },
  entry: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      path.resolve(__dirname, '../src/index.js'),
  ],
  output: {
    // REQUIRED: file and chunk names should match
    filename: '[name].js',
    chunkFilename: '[name].js',
    // REQUIRED: where to write files to
    path: path.resolve(__dirname, '../buildClient'),
    // REQUIRED: where files will be served from
    publicPath: '/static/'
  },
    optimization: {
        runtimeChunk: {
            name: 'bootstrap'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
  plugins: [
    new WriteFilePlugin(),
    // REQUIRED: We have to initialize our ExtractCssChunks plugin
      new ExtractCssChunks(),

    // REQUIRED: Needed to put webpack bootstrap code before chunks
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['bootstrap'],
    //   filename: '[name].js',
    //   minChunks: Infinity
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
    })
  ]
}