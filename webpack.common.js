/* @imports */
let path = require("path");

let CopyPlugin = require("copy-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");

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
			title: "Maximus Addon Configuration",
			template: path.resolve(__dirname, "./src/app/view/config.view.html"),
			excludeChunks: ["app", "background"]
		})
	],
	resolve: {
		modules: [
			path.resolve("./src"),
			path.resolve("./node_modules")
		]
	}
};
