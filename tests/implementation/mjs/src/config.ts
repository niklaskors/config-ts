import { configure } from 'configure.ts';

const config = await configure({
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

/**
const config: {
	environment: "development" | "production" | "test";
	port: number;
	cloudSecret: string;
}
*/

export { config };
