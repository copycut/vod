const webpack = require('webpack')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  stats: 'minimal',
  performance: {
    hints: false,
  },
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : false,
  entry: {
    Client: './src/client.entry.ts',
  },
  target: 'web',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  },
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: `/${process.env.BUILD_NUMBER}/assets/`,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.svg/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              {removeDoctype: true},
              {removeComments: true},
              {cleanupIDs: true},
              {removeTitle: true},
              {removeXMLNS: true},
              {removeDimensions: true},
              {removeViewBox: false},
            ],
          },
        },
      },
      {
        test: /\.js$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              silent: false,
              compilerOptions: {
                target: 'es5',
                module: 'esnext',
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        type: 'javascript/auto',
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
              silent: false,
              compilerOptions: {
                target: 'es5',
                module: 'esnext',
              },
            },
          },
        ],
      },
      // Local CSS
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'vue-style-loader',
            options: {
              manualInject: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              context: __dirname, // See: https://github.com/webpack-contrib/css-loader/issues/413
              modules: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: isProd
                ? '[local]-[hash:5]'
                : 'it__[folder]-[local]-[hash:5]',
            },
          },
          {loader: 'postcss-loader'},
        ],
        include: [path.join(__dirname, '../src')],
      },
      // Global CSS
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader',
            options: {
              manualInject: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {loader: 'postcss-loader'},
        ],
        include: [path.join(__dirname, '../node_modules')],
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
        default: false,
      },
    },
    minimize: isProd,
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: isProd,
        uglifyOptions: {
          ie8: true,
          compress: {
            warnings: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
      VUE_ENV: 'client',
      ISOMORPHIC_ENV: 'client',
      BUILD_NUMBER: process.env.BUILD_NUMBER,
    }),
    new VueSSRClientPlugin({
      filename: '../vue-ssr-client-manifest.json',
    }),
  ],
}
