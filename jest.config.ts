import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	clearMocks: true,
	coverageReporters: ['json-summary', 'text', 'lcov'],
	testPathIgnorePatterns: ['/node_modules/'],
	testMatch: ['**/?(*.)+(spec|integration).ts'],
	watchPathIgnorePatterns: ['/node_modules/'],
};

export default config;
