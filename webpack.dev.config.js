"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var config = {
    entry: ['./src/index.tsx'],
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            types: path.resolve(__dirname, 'types/*'),
            components: path.resolve(__dirname, 'src/components'),
            modules: path.resolve(__dirname, 'src/modules'),
            '@': path.resolve(__dirname, 'src'),
        },
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
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|woff2)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            fallback: require.resolve('file-loader'),
                        },
                    },
                ],
            },
            {
                test: /\.svg$/i,
                use: ['@svgr/webpack'],
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
exports.default = config;
