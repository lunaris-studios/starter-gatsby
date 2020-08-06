/**
 * Implement Gatsby's Config in this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

import * as GB from "gatsby";
import * as Path from "path";

const ROOT = Path.resolve(__dirname, "../../..");

const plugins: GB.PluginRef[] = [
	"gatsby-plugin-catch-links",
	"gatsby-plugin-offline",
	"gatsby-plugin-react-helmet",
	"gatsby-plugin-sharp",
	"gatsby-plugin-styled-components",
	"gatsby-plugin-typescript",
	"gatsby-plugin-transition-link",
	"gatsby-transformer-sharp",
	{
		resolve: "gatsby-alias-imports",
		options: {
			aliases: {
				"~": "src",
			},
		},
	},
	{
		resolve: "gatsby-plugin-page-creator",
		options: {
			path: `${ROOT}/src/views`,
			ignore: {
				patterns: ["**/*.(styled|helpers).(js|ts)?(x)", "lib/**/*"],
				options: { nocase: true },
			},
		},
	},
	{
		resolve: "gatsby-plugin-nprogress",
		options: {
			color: "hsl(208, 98%, 50%)",
			showSpinner: false,
		},
	},
	{
		resolve: "gatsby-plugin-typegen",
		options: {
			outputPath: "src/api/gatsby/types.d.ts",
			emitSchema: {
				"./src/api/gatsby/introspection.json": true,
				"./src/api/gatsby/schema.graphql": true,
			},
			emitPluginDocuments: {
				"./src/api/gatsby/plugin-documents.graphql": true,
			},
		},
	},
	{
		resolve: "gatsby-source-filesystem",
		options: {
			name: "images",
			path: `${ROOT}/src/images`,
		},
	},
];

const config = Object.freeze<GB.GatsbyConfig>({
	plugins,
});

export default config;
