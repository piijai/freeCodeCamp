const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const contextPath = path.resolve(__dirname, "./Src");

//module.exports = (env, argv) => {
//const isProduction = argv.mode === "production";

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            // Styles
            {
                test: /\.(scss|css)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "./dist" },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => {
                return "./style.css";
            },
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{ from: 'src/index.html' }],
        }),
        new ProgressBarPlugin(),
    ]
};

module.exports = config;

//if (!isProduction) {
//  options.devtool = 'source-map';
//}