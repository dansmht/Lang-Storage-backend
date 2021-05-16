import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { TopicItemsService } from '../topic-items/topic-items.service';
import { TopicDto } from './dto/topic.dto';
import { Topic } from './entities/topic.entity';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic) private topicsRepository: Repository<Topic>,
    private usersService: UsersService,
    private topicItemsService: TopicItemsService,
  ) {}

  async findAll() {
    const topics = await this.topicsRepository.find({
      relations: ['user'],
      order: {
        updatedDate: 'DESC',
      },
    });

    return topics;
  }

  async findCurrentUserTopics(userGoogleId: string) {
    const user = await this.usersService.findByGoogleId(userGoogleId);
    const topics = await this.topicsRepository.find({
      relations: ['user'],
      where: [{ user: { id: user.id } }],
      order: {
        position: 'ASC',
      },
    });

    return topics;
  }

  async findExceptCurrentUserTopics(userGoogleId: string) {
    const user = await this.usersService.findByGoogleId(userGoogleId);
    const topics = await this.topicsRepository.find({
      relations: ['user'],
      where: [{ user: { id: Not(user.id) }, isPrivate: false }],
      order: {
        updatedDate: 'DESC',
      },
    });

    return topics;
  }

  findOne(id: number) {
    return this.topicsRepository.findOne(id);
  }

  async create(userGoogleId: string, topicDto: TopicDto) {
    const { name, isPrivate, topicItems, position } = topicDto;

    const topic = this.topicsRepository.create({ name, isPrivate, position });

    topic.updatedDate = new Date();
    topic.user = await this.usersService.findByGoogleId(userGoogleId);
    topic.items = await this.topicItemsService.createMany(topicItems);

    return this.topicsRepository.save(topic);
  }

  async update(id: number, topicDto: TopicDto) {
    const { name, isPrivate, topicItems, position } = topicDto;

    const topic = await this.topicsRepository.findOne(id);

    topic.updatedDate = new Date();
    topic.name = name;
    topic.isPrivate = isPrivate;
    topic.position = position;
    topic.items = await this.topicItemsService.createMany(topicItems);

    return this.topicsRepository.save(topic);
  }

  async updatePosition(id: number, updatePositionDto: UpdatePositionDto) {
    const { position } = updatePositionDto;

    const topic = await this.topicsRepository.findOne(id);

    topic.position = position;

    return this.topicsRepository.save(topic);
  }

  async remove(id: number) {
    const topic = await this.topicsRepository.findOne(id);

    return this.topicsRepository.remove(topic);
  }
}
