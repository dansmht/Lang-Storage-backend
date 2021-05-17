import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ReformatterModule } from './modules/reformatter/reformatter.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { TopicsModule } from './models/topics/topics.module';
import { TopicItemsModule } from './models/topic-items/topic-items.module';
import { LocalesModule } from './models/locales/locales.module';
import { ExamplesModule } from './models/examples/examples.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get('POSTGRES_TYPE'),
          host: configService.get('POSTGRES_HOST'),
          port: parseInt(configService.get('POSTGRES_PORT')) || 3000,
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get('NODE_ENV') === 'development',
        } as Partial<TypeOrmModuleOptions>),
      inject: [ConfigService],
    }),
    PassportModule.register({ session: true }),
    ReformatterModule,
    AuthModule,
    UsersModule,
    TopicsModule,
    TopicItemsModule,
    LocalesModule,
    ExamplesModule,
  ],
  providers: [],
})
export class AppModule {}
