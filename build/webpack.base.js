const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const POSTCSS_OPTIONS = {
	loader: 'postcss-loader',
	options: {
		postcssOptions: {
			plugins: [
				require('autoprefixer')({
					overrideBrowserslist: ['last 2 versions']
				})
			]
		}
	}
};

const CSS_OPTIONS = {
	loader: 'css-loader',
	options: {
		importLoaders: 2,
		modules: { auto: true },
	},
};

module.exports = {
	entry: {
		bundle: [
			'@babel/polyfill/dist/polyfill.min.js',
			path.resolve('src/index.js')
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env.BUILD': JSON.stringify('web')
		})
	],
	target: 'web',
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			vue$: 'vue/dist/vue.runtime.esm.js',
			'@': path.resolve()
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					transformAssetUrls: {
						video: ['src', 'poster'],
						source: 'src',
						img: 'src',
						image: 'xlink:href',
						'b-img': 'src',
						'b-img-lazy': ['src', 'blank-src'],
						'b-card': 'img-src',
						'b-card-img': 'src',
						'b-card-img-lazy': ['src', 'blank-src'],
						'b-carousel-slide': 'img-src',
						'b-embed': 'src'
					},
					loaders: {
						scss: 'style-loader!css-loader!sass-loader'
					}
				}
			},
			{
				test: /\.js$/,
				exclude(file) {
					return /node_module/.test(file) && !/@ccccit/.test(file);
				},
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.(png|jpg|svg|gif|jpeg)$/,
				loader: 'url-loader',
				options: {
					esModule: false,
					limit: 10000,
					// outputPath: 'images/'
				}
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf)$/,
				loader: 'file-loader'
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					CSS_OPTIONS,
					POSTCSS_OPTIONS,
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					CSS_OPTIONS,
					POSTCSS_OPTIONS
				]
			},
			{
				test: /\.yaml$/,
				use: [
					'json-loader',
					'yaml-loader'
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			name: true,
			cacheGroups: {
				commons: {
					test: /node_modules/,
					name: 'vendors',
					chunks: 'all'
				}
			},
		}
	},
	node: false
};
