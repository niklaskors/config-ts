import { configure } from 'configure.ts';

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

export { config };
