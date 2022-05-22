module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testPathIgnorePatterns: [
		"<rootDir>/.next/",
		"<rootDir>/node_modules/",
		"<rootDir>/coverage",
		"<rootDir>/dist",
	],
	moduleDirectories: ["<rootDir>/node_modules", "./"],
	moduleNameMapper: {
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
		"^@components(.*)$": "<rootDir>/components/$1",
		"^@pages(.*)$": "<rootDir>/pages/$1",
		"^@styles(.*)$": "<rootDir>/styles/$1",
		"^@utils(.*)$": "<rootDir>/utils/$1",
		"^@services(.*)$": "<rootDir>/services/$1",
		"^@validations(.*)$": "<rootDir>/validations/$1",
		"^yupResolver(.*)$": "<rootDir>/node_modules/@hookform/resolvers/yup",
	},
	coverageDirectory: "coverage",
	collectCoverageFrom: [
		"components/**/*.{js,jsx,ts,tsx}",
		"pages/**/*.{js,jsx,ts,tsx}",
		"services/**/*.{js,jsx,ts,tsx}",
		"utils/**/*.{js,jsx,ts,tsx}",
	],
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0,
		},
	},
};
