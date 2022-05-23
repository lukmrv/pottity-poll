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
		"^@components(.*)$": "<rootDir>/src/common/components/$1",
		"^@pages(.*)$": "<rootDir>/src/common/pages/$1",
		"^@styles(.*)$": "<rootDir>/src/common/styles/$1",
		"^@utils(.*)$": "<rootDir>/src/common/utils/$1",
		"^@services(.*)$": "<rootDir>/src/common/services/$1",
		"^@validations(.*)$": "<rootDir>/src/common/validations/$1",
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
