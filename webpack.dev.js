/* @imports */
let merge = require("webpack-merge");
let common = require("./webpack.common");

/* @config */
module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	watch: true,
	watchOptions: {
		aggregateTimeout: 600,
		poll: 1000,
		ignored: ["./addon/", "./node_modules/"]
	}
});
