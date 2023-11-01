import configure from '../../src';

describe('Configuration with async variable', () => {
	it('Should generate configuration with a async variable', async () => {
		const config = await configure({
			asyncVariable: {
				load: async () =>
					await new Promise<string>(res =>
						setTimeout(() => {
							res('resolved');
						}, 1),
					),
			},
		});

		expect(config.asyncVariable).toBe('resolved');
	});
});
