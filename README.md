# Configure.ts
A simple module to help setting up a centralised typed configuration for Node.js applications.

✅ Supports both CommonJS & ESM (use ESM for top-level await)   
🏁 TypeScript ready

## Why is this useful?
This module provides a method for streamlining the usage of configuration variables.
By managing the way environment variables are loaded and typed it tries to prevent:
- Forgetting to convert boolean/number strings into actual booleans and numbers
- Failing in the middle of execution, if a environment variable loader returns `NaN`/`undefined` and there is no default set, it will fail on start
- Having multiple `process.env` references throughout the application

## Examples

### Node.js + TypeScript
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

### NestJS
Create a `configuration.ts` file
```ts
import { configure } from 'configure.ts';

export const config = async () =>
  await configure({
    port: {
      default: 3000,
      env: (e) => +e.PORT,
    },
    secret: {
      // Example async usage
      load: async () => {
        return await new Promise<string>((res) => {
          setTimeout(() => {
            res('secret');
          }, 1000);
        });
      },
    },
  });

export type Config = Awaited<ReturnType<typeof config>>;
```

Import ConfigModule in `AppModule`:
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Consume in any given controller/service:
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/configuration';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService<Config>,
  ) {
    const port = this.configService.get('port', { infer: true });

    /**
     * port: number
     */
  }
}
```