
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const baseConfig = require('./webpack.config.base')

const jsonStringify = v => JSON.stringify(v)
const isDev = process.env.NODE_ENV === 'development'
const devServer = {
  host: '127.0.0.1',
  port: '8888',
  hot: true,
  historyApiFallback: true,
  overlay: {
    errors: false
  },
  publicPath: '/',
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3333',
      pathRewrite: {'^/api' : ''},
      changeOrigin: true
    },
    '/h5': {
      target: 'http://47.94.209.108:7002',
      pathRewrite: {'^/h5' : ''},
      changeOrigin: true
    }
  }
}
const defaultPlugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: isDev ? jsonStringify('development') : jsonStringify('production')
    }
  }),
  new HtmlWebpackPlugin({
    hash: true,
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.html')
  })
]

let config

if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
    devServer: devServer,
    entry: {
      index: [
        'react-hot-loader/patch',
        path.resolve(__dirname, '../src/index.js')
      ]
    },
    module: {
      rules: [
        {
          test: /.less$/,
          exclude: /node_modules/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader", options: { importLoaders: 1, module: true, localIdentName: '[local]__[hash:8]' } },
            { loader: "postcss-loader" },
            { loader: "less-loader" }
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    mode: 'production',
    entry: {
      index: path.resolve(__dirname, '../src/index.js')
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: {
        name: 'runtime',
      }
    },
    module: {
      rules: [
        {
          test: /.less$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1, minimize: true, module: true, } },
            { loader: 'postcss-loader' },
            { loader: 'less-loader' }
          ],
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:8].css",
        chunkFilename: "[id].css"
      }),
    ])
  })
}

module.exports = config
