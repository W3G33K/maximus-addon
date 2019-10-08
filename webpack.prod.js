/* @imports */
let merge = require("webpack-merge");
let common = require("./webpack.common");

let { CleanWebpackPlugin } = require("clean-webpack-plugin");

/* @config */
module.exports = merge(common, {
	mode: "production",
	plugins: [
		new CleanWebpackPlugin()
	]
});
