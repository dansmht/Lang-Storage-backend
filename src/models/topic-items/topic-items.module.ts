import { Module } from '@nestjs/common';
import { TopicItemsService } from './topic-items.service';
import { TopicItemsController } from './topic-items.controller';

@Module({
  controllers: [TopicItemsController],
  providers: [TopicItemsService]
})
export class TopicItemsModule {}
