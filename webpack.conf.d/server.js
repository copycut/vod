const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
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
    Server: './src/server.entry.ts',
  },
  target: 'node',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2',
    filename: '[name].js',
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
        // HACK: webpack ?ref-- hack for css-loader
        test: /\.js$/,
        type: 'javascript/auto',
        include: () => false,
      },
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
              silent: false,
              compilerOptions: {
                target: 'es2017',
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
    minimize: false,
  },
  externals: nodeExternals({
    whitelist: [/\.css$/i],
  }),
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
      VUE_ENV: 'server',
      ISOMORPHIC_ENV: 'server',
    }),
    new VueSSRServerPlugin(),
  ],
}
