const webpack = require('webpack');
const path = require('path');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'build');

const config = {
  entry: [path.join(__dirname, '/src/Methone.js')],
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: 'Methone.js', // Name of output file
    libraryTarget: 'commonjs2'
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // All .js files
        loaders: ['babel-loader'], 
        exclude: [nodeModulesPath],
      },
    ],
  },
};

module.exports = config;
