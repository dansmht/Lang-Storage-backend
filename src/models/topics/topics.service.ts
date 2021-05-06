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

  findAll() {
    return this.topicsRepository.find();
  }

  findOne(id: number) {
    return this.topicsRepository.findOne(id);
  }

  async create(topicDto: TopicDto) {
    const { userGoogleId, name, topicItems } = topicDto;

    const topic = this.topicsRepository.create({ name });

    topic.user = await this.usersService.findByGoogleId(userGoogleId);
    topic.items = await this.topicItemsService.createMany(topicItems);

    return this.topicsRepository.save(topic);
  }

  async update(id: number, topicDto: TopicDto) {
    const { name, topicItems } = topicDto;

    const topic = await this.topicsRepository.findOne(id);

    topic.name = name;
    topic.items = await this.topicItemsService.createMany(topicItems);

    return this.topicsRepository.save(topic);
  }

  async remove(id: number) {
    const topic = await this.topicsRepository.findOne(id);

    return this.topicsRepository.remove(topic);
  }
}
