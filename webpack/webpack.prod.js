const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new DotenvWebpackPlugin({
      path: './.env.production'
    }),
  ],
}
