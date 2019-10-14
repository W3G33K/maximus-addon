/* @imports */
let path = require("path");
let webpack = require("webpack");

let CopyPlugin = require("copy-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");

/* @globals */
let ProvidePlugin = webpack.ProvidePlugin;

/* @config */
module.exports = {
	entry: {
		app: path.resolve(__dirname, "./src/app/app.module.js"),
		background: path.resolve(__dirname, "./src/app/background.module.js"),
		config: path.resolve(__dirname, "./src/app/config.module.js")
	},
	output: {
		filename: "js/[name].bundle.js",
		chunkFilename: "js/[name].bundle.js",
		path: path.resolve(__dirname, "./addon")
	},
	optimization: {
		splitChunks: {
			filename: "js/vendor.bundle.js",
			chunks: "all",
			name: "vendors",
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/].*js/
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.html$/i,
				use: {
					loader: "html-loader",
					options: {
						collapseWhitespace: true,
						conservativeCollapse: false,
						minimize: true,
						removeAttributeQuotes: false,
						removeComments: true
					}
				}
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/i,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		new CopyPlugin([
			{
				from: path.resolve(__dirname, "./src/app/browser/manifest.json"),
				to: "./manifest.json",
				toType: "file"
			}
		]),

		new ExtractTextPlugin(
			"css/app.bundle.css"
		),

		new HtmlWebpackPlugin({
			filename: "config.html",
			template: path.resolve(__dirname, "./src/app/view/config.view.html"),
			excludeChunks: ["app", "background"]
		}),

		new ProvidePlugin({
			"window.jQuery": "jquery"
		})
	],
	resolve: {
		modules: [
			path.resolve("./src"),
			path.resolve("./node_modules")
		]
	}
};
