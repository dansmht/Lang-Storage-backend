import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies';
import { SessionSerializer } from './utils/Serializer';
import { User } from '../models/users/entities/user.entity';
import { UsersModule } from '../models/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, SessionSerializer, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
