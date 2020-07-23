module.exports = {
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
	moduleNameMapper: {
		".+\\.svg$": "<rootDir>/mocks/svg-mock.tsx",
		".+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/mocks/file-transformer.js",
		"^~/(.*)$": "<rootDir>/src/$1",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
	setupFilesAfterEnv: [
		"@testing-library/jest-dom/extend-expect",
		"@testing-library/jest-dom",
		"jest-styled-components",
		"jest-extended",
	],
};