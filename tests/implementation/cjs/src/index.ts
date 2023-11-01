import { config } from './config';
import { moduleInit } from './module';

// Boot
(async () => {
	await config;

	await moduleInit();
})();
