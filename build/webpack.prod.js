const webpackBaseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = merge(webpackBaseConfig, {
	mode: 'production',
	output: {
		path: path.resolve('dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: 'head',
			template: path.join(__dirname, './index.html')
		})
	]
});
