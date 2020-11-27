/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const compressionRegex = /\.(js|png|jpg|html|css)$/;

module.exports = {
	mode: "production",
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
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[hash:base64]",
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
		globalObject: "this",
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/",
		filename: "main.[contenthash].wp.js",
		chunkFilename: "[contenthash].js",
	},
	optimization: {
		splitChunks: {
			chunks: "async",
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
		minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
	},
	plugins: [
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
		new CompressionPlugin({
			cache: true,
			filename: "[path][base].br",
			algorithm: "brotliCompress",
			test: compressionRegex,
		}),
		new CompressionPlugin({
			cache: true,
			filename: "[path][base].gz",
			test: compressionRegex,
		}),
	],
};
