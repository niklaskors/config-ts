import type { Config } from 'jest';

const config: Config = {
  preset: "ts-jest/presets/default-esm",
	clearMocks: true,
	coverageReporters: ['json-summary', 'text', 'lcov'],
	testPathIgnorePatterns: ['/node_modules/'],
	testMatch: ['**/?(*.)+(spec|integration).ts'],
	watchPathIgnorePatterns: ['/node_modules/'],
	transform: {
		'\\.ts$': ['ts-jest', {
			tsconfig: 'tsconfig.json',
			useESM: true
		}]
  },
};

export default config;
