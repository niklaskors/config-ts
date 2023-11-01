import * as dotenv from 'dotenv';
import { dirname, join } from 'path';

function resolveEnvPath(providedEnvFilePath?: string) {
	if (providedEnvFilePath) {
		if (providedEnvFilePath.includes('/')) {
			return providedEnvFilePath;
		}
	}

	try {
		// Is running in Node
		if (require.main) {
			return join(
				dirname(require.main.filename),
				providedEnvFilePath ?? '.env',
			);
		}
	} catch (e) {
		//
	}

	return '.env';
}

function validateResolvedVariable(resolvedEnvVariable: any) {
	return !(
		typeof resolvedEnvVariable === 'undefined' ||
		(typeof resolvedEnvVariable === 'number' && isNaN(resolvedEnvVariable))
	);
}

export async function configure<
	T extends {
		[key: string]:
			| {
					default?: any;
					env: (e: { [key: string]: string }) => Y;
					load?: never;
			  }
			| {
					default: string;
					env?: (e: { [key: string]: string }) => Y;
					load?: never;
			  }
			| {
					default?: any;
					load: () => Promise<Y>;
					env?: never;
			  };
	},
	Y,
>(
	configuration: T,
	options?: {
		envFilePath: string;
	},
): Promise<{
	[K in keyof T]: T[K]['load'] extends () => Promise<infer Y>
		? Y
		: T[K]['env'] extends (e: { [key: string]: string }) => infer Y
		? Y
		: T[K]['default'];
}> {
	dotenv.config({ path: resolveEnvPath(options?.envFilePath), override: true });

	const processEnv = process.env as any;
	const config: any = {};

	for (const key in configuration) {
		const entry = configuration[`${key}`];

		if ('default' in entry) {
			config[`${key}`] = entry.default;
		}

		const resolvedEnvVariable = await (async () => {
			if (entry.env) {
				return entry.env(processEnv);
			}

			if (entry.load) {
				return await entry.load();
			}
		})();

		if (!validateResolvedVariable(resolvedEnvVariable)) {
			if (!('default' in entry)) {
				throw new Error(
					`Config variable '${key}' cannot be '${typeof resolvedEnvVariable}'`,
				);
			}

			// Will leave the config set to the default value
			continue;
		}

		config[`${key}`] = resolvedEnvVariable;
	}

	return new Promise(resolve => {
		resolve(config);
	});
}
