import configure from '../../../src';

describe('Configuration with .env file', () => {
	it('Should load a variable from .env', async () => {
		/**
		 * Loads the .env from the same directory by default
		 */
		const config = await configure({
			customVariable: {
				env: e => e.CUSTOM_ENVIRONMENT_VARIABLE as 'DEFINED' | 'UNDEFINED',
			},
		});

		expect(config.customVariable).toEqual('DEFINED');
	});

	it('Should load a variable from .custom.env', async () => {
		const config = await configure(
			{
				customVariable: {
					env: e => e.CUSTOM_ENVIRONMENT_VARIABLE as 'DEFINED' | 'UNDEFINED',
				},
			},
			{
				envFilePath: '.custom.env',
			},
		);

		expect(config.customVariable).toEqual('UNDEFINED');
	});
});
