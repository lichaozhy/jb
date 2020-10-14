const webpackBaseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const Mock = {
	Client: require('../public/clients.json'),
	Data: require('../public/data.json')
};

const Koa = require('koa');
const KoaRouter = require('@koa/router');

const app = new Koa();

const router = new KoaRouter();

router.get('/clients', ctx => {
	ctx.body = Mock.Client;
}).get('/data/:ip', ctx => {
	ctx.body = Mock.Data;
});

app.use(router.routes()).listen(8080);

module.exports = merge(webpackBaseConfig, {
	devtool: '#inline-source-map',
	mode: 'development',
	output: {
		filename: '[name].js'
	},
	devServer: {
		port: 3000,
		host: '0.0.0.0',
		proxy: {
			context: ['/clients', '/data'],
			target: 'http://127.0.0.1:8080',
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: 'head',
			template: path.join(__dirname, './index.html')
		})
	]
});
