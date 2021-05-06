import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicItemsModule } from '../topic-items/topic-items.module';
import { UsersModule } from '../users/users.module';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { Topic } from './entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), UsersModule, TopicItemsModule],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
