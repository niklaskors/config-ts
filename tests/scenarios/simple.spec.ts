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
});
