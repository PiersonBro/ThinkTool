/**
 * /* eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: path.join(__dirname, "/src/index.jsx"),
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(s*)css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[path][name]__[local]",
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.(jpg|png)$/,
				loader: "file-loader",
			},
		],
	},
	resolve: {
		extensions: [".jsx", ".js"],
	},
	output: {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/",
		filename: "main.wp.js",
		chunkFilename: "[id].js",
	},
	devServer: {
		contentBase: path.join(__dirname, "public/"),
		port: 3000,
		publicPath: "/",
		historyApiFallback: true,
		hotOnly: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: "Think Tool",
			minify: true,
			template: "./public/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[hash].css",
			chunkFilename: "[id].css",
			ignoreOrder: false,
		}),
	],
};
