# Configure.ts
A simple module to help setting up a centralised typed configuration for Node.js applications.

✅ Supports both CommonJS & ESM (use ESM for top-level await)   
🏁 TypeScript ready

## Why is this useful?
This module provides a method for streamlining the usage of configuration variables.
By managing the way environment variables are loaded and typed it tries to prevent:
- Forgetting to convert boolean/number strings into actual booleans and numbers
- Fail early, if a environment variable loader returns `NaN`/`undefined` and there is no default set, it will fail on start
- Having multiple `process.env` references throughout the application

## Example
Below is a sample `config.ts` file (be aware that this uses top-level await):
```ts
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
```
