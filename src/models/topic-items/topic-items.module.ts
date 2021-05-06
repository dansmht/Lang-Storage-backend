import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicItemsController } from './topic-items.controller';
import { LocalesModule } from '../locales/locales.module';
import { ExamplesModule } from '../examples/examples.module';
import { TopicItemsService } from './topic-items.service';
import { TopicItem } from './entities/topic-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicItem]),
    LocalesModule,
    ExamplesModule,
  ],
  controllers: [TopicItemsController],
  providers: [TopicItemsService],
  exports: [TopicItemsService],
})
export class TopicItemsModule {}
