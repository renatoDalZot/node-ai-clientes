module.exports = {
	moduleFileExtensions: [
      "js",
      "json",
      "ts"
    ],
    rootDir: "src",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: [
      "**/*.(t|j)s"
    ],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
	collectCoverage: false,
	/* coverageDirectory: 'coverage', */
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',    
  }
};