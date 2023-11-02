import { config } from './config';

export async function moduleInit() {
	// eslint-disable-next-line no-console
	console.log((await config).cloudSecret);
}
