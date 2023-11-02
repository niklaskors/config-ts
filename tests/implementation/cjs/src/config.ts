import { configure } from 'configure.ts';

const config = configure({
	environment: {
		env: e => e.NODE_ENV as 'development' | 'production' | 'test',
	},
	port: {
		default: 80,
		env: e => +e.PORT,
	},
	cloudSecret: {
		load: async () =>
			await new Promise<string>(res =>
				setTimeout(() => {
					res('mysecretvalue');
				}, 1),
			),
	},
});

export { config };
