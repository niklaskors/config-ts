import configure from '../../src';

describe('Simple configuration', () => {
	it('Should generate configuration with a single variable', async () => {
		const config = await configure({
			environment: {
				env: e => e.NODE_ENV as 'development' | 'production' | 'test',
			},
		});

		expect(
			config.environment === 'development' ||
				config.environment === 'production' ||
				config.environment === 'test',
		).toBe(true);
	});

	it('Should generate configuration with a default variable', async () => {
		const config = await configure({
			port: {
				default: 80,
				env: e => +e.PORT,
			},
		});

		expect(config.port).toBe(80);
	});

	it('Should throw an error when env() returns undefined and no default exists', async () => {
		const config = configure({
			port: {
				env: e => e.PORT,
			},
		});

		expect(async () => await config).rejects.toThrow(
			`Config variable 'port' cannot be 'undefined'`,
		);
	});
});
