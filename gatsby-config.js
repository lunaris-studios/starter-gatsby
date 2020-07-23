/**
 * Implement Gatsby's Config in this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const tsConfig = require("./tsconfig.json");

require("source-map-support").install();
require("ts-node").register({
  compilerOptions: {
    module: "commonjs"
  }
});
require("tsconfig-paths").register({
	baseUrl: tsConfig.compilerOptions.baseUrl,
	paths: tsConfig.compilerOptions.paths,
});

module.exports = require("./src/gatsby/api/gatsby-config.ts");
