/**
 * /* eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

const SERVER_PATH = path.join(__dirname, "/server/server.ts");

module.exports = {
	mode: "production",
	entry: SERVER_PATH,
	output: {
		path: path.join(__dirname, "dist/"),
		publicPath: "/",
		filename: "server.[contenthash].wp.js",
	},
	target: "node",
	node: {
		__dirname: false,
		__filename: false,
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".js"],
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
		minimizer: [new TerserPlugin()],
	},
};
