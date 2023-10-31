import * as dotenv from 'dotenv';
import { dirname, join } from 'path';

export function configure<
	T extends {
		[key: string]:
			| {
					default?: any;
					env: (e: { [key: string]: string }) => Y;
			  }
			| {
					default: string;
					env?: (e: { [key: string]: string }) => Y;
			  };
	},
	Y,
>(
	configuration: T,
	options?: {
		envFilePath: string;
	},
): {
	[K in keyof T]: T[K]['env'] extends (e: { [key: string]: string }) => infer Y
		? Y
		: T[K]['default'];
} {
	const envFilePath = require.main
		? join(dirname(require.main.filename), '../.env')
		: options?.envFilePath;

	if (envFilePath) {
		dotenv.config({ path: envFilePath, override: true });
	}

	const processEnv = process.env as any;
	const config: any = {};

	for (const key in configuration) {
		const entry = configuration[`${key}`];

		if ('default' in entry) {
			config[`${key}`] = entry.default;
		}

		if (entry.env) {
			const envResolved: any = entry.env(processEnv);

			if (
				typeof envResolved === 'undefined' ||
				(typeof envResolved === 'number' && isNaN(envResolved))
			) {
				if (!('default' in entry)) {
					throw new Error(
						`Config variable '${key}' cannot be '${typeof envResolved}'`,
					);
				}

				// Will leave the config set to the default value
				continue;
			}

			config[`${key}`] = envResolved;
		}
	}

	return config;
}
