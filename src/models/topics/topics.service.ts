import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Topic } from './entities/topic.entity';
import { UsersService } from '../users/users.service';
import { TopicItemsService } from '../topic-items/topic-items.service';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic) private topicsRepository: Repository<Topic>,
    private usersService: UsersService,
    private topicItemsService: TopicItemsService,
  ) {}

  async create(createTopicDto: CreateTopicDto) {
    const { userGoogleId, name, topicItems } = createTopicDto;
    const topic = this.topicsRepository.create({ name });

    const user = await this.usersService.findByGoogleId(userGoogleId);

    topic.user = user;

    // TODO
    // topic.items = topicItems;

    return 'This action adds a new topic';
  }

  findAll() {
    return `This action returns all topics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
