import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { TopicItemsService } from '../topic-items/topic-items.service';
import { TopicDto } from './dto/topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic) private topicsRepository: Repository<Topic>,
    private usersService: UsersService,
    private topicItemsService: TopicItemsService,
  ) {}

  async create(topicDto: TopicDto) {
    const { userGoogleId, name, topicItems } = topicDto;

    const topic = this.topicsRepository.create({ name });

    topic.user = await this.usersService.findByGoogleId(userGoogleId);
    topic.items = await this.topicItemsService.createMany(topicItems);

    return this.topicsRepository.save(topic);
  }

  findAll() {
    return this.topicsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, topicDto: TopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
