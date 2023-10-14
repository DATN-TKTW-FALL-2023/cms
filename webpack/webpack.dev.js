const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new DotenvWebpackPlugin({
      path: './.env.development'
    })
  ],
}
