/* @imports */
let path = require("path");

let CopyPlugin = require('copy-webpack-plugin');

/* @config */
module.exports = {
	entry: {
		app: path.resolve(__dirname, "./src/app/app.module.js")
	},
	output: {
		filename: "js/[name].bundle.js",
		path: path.resolve(__dirname, "./addon")
	},
	optimization: {
		splitChunks: {
			filename: "js/vendor.bundle.js",
			chunks: "all"
		}
	},
	plugins: [
		new CopyPlugin([
			{
				from: path.resolve(__dirname, "./src/app/browser/manifest.json"),
				to: "./manifest.json",
				toType: "file"
			}
		])
	]
};
