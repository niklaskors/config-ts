import { configure } from 'configured';

const config = configure({
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
