import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocalesController } from './locales.controller';
import { LocalesService } from './locales.service';
import { Locale } from './entities/locale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Locale])],
  controllers: [LocalesController],
  providers: [LocalesService],
})
export class LocalesModule {}
