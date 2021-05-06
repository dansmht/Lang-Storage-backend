import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicItemsService } from './topic-items.service';
import { TopicItemsController } from './topic-items.controller';
import { TopicItem } from './entities/topic-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopicItem])],
  controllers: [TopicItemsController],
  providers: [TopicItemsService],
})
export class TopicItemsModule {}
