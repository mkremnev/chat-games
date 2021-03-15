const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['src/index.tsx'],
	mode: 'development',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/env'],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { modules: true } },
					'sass-loader',
				],
			},
		],
	},
	devServer: {
		historyApiFallback: true,
		inline: true,
		contentBase: ['./dist'],
		port: 5000,
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};
