"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var html_webpack_plugin_1 = require("html-webpack-plugin");
var config = {
    entry: ['./src/index.tsx'],
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path_1.default.join(__dirname, '/dist'),
        filename: 'index.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            types: path_1.default.resolve(__dirname, 'types/*'),
            components: path_1.default.resolve(__dirname, 'src/components'),
            modules: path_1.default.resolve(__dirname, 'src/modules'),
            '@': path_1.default.resolve(__dirname, 'src'),
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
        new html_webpack_plugin_1.default({
            template: './public/index.html',
        }),
    ],
};
exports.default = config;
