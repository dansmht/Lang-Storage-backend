import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  const redisClient = redis.createClient({
    url: configService.get('REDIS_URI'),
  });
  const RedisStore = connectRedis(session);

  redisClient.on('connect', () => Logger.log('Connected to Redis', 'Redis'));

  const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
  app.use(
    session({
      cookie: {
        maxAge: ONE_MONTH,
      },
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const PORT = parseInt(configService.get('PORT'));
  await app.listen(PORT, () => {
    Logger.log(`Listening at ${PORT} PORT`, 'Main');
    Logger.log(`Running in ${configService.get('NODE_ENV')} mode`, 'Main');
  });
}
bootstrap();
