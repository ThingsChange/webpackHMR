import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Webpack2Polyfill from 'webpack2-polyfill-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';

module.exports = {
  entry: [
    './src/scripts/index.js',
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'src'),
    publicPath: 'http://localhost:8080/',
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      'node_modules',
    ],
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'eslint-loader',
        enforce: 'pre', 
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              autoprefixer: false,
              sourceMap: true,
              importLoaders: 1,
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['syntax-dynamic-import'],
        },
      },
    ],
  },
  devServer: {
    hot: true, // this enables hot reload
    inline: true, // use inline method for hmr
    overlay: false, // display errors as browser-overlay
    quiet: false,
    // host: 'app.dev',
    port: 8080,
    contentBase: path.join(__dirname, 'src'),
    // watchContentBase: true, // HMR is not working with true
    watchOptions: {
      poll: false, // needed for homestead/vagrant setup, review
    },
  },
  plugins: [
      new Webpack2Polyfill(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './src/ejs/_layout.ejs', // load custom template '.ejs' by default
        inject: true,
        alwaysWriteToDisk: true,
      }),
      new HtmlWebpackHarddiskPlugin(),
    ],
};

