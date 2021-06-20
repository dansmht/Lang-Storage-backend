import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { TopicItemsService } from '../topic-items/topic-items.service';
import { ReformatterService } from '../../modules/reformatter/reformatter.service';
import { TopicDto } from './dto/topic.dto';
import { Topic } from './entities/topic.entity';
import { UpdatePositionDto } from './dto/update-position.dto';
import { TopicForResponse, TopicsResponse } from '../../utils/response-types';
import { QueryType } from '../../utils/types';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic) private topicsRepository: Repository<Topic>,
    private usersService: UsersService,
    private topicItemsService: TopicItemsService,
    private reformatterService: ReformatterService,
  ) {}

  async findAll(): Promise<TopicForResponse[]> {
    const topics = await this.topicsRepository.find({
      order: {
        updatedDate: 'DESC',
      },
    });

    return this.reformatterService.topicsForResponse(topics);
  }

  async findCurrentUserTopics(
    userGoogleId: string,
    query: QueryType,
  ): Promise<TopicsResponse> {
    const user = await this.usersService.findByGoogleId(userGoogleId);
    const [topics, total] = await this.topicsRepository.findAndCount({
      where: [{ user: { id: user.id } }],
      order: {
        position: 'ASC',
      },
      take: Number(query.take),
      skip: (Number(query.page) - 1) * Number(query.take),
    });

    return {
      topics: this.reformatterService.topicsForResponse(topics),
      total,
    };
  }

  async findExceptCurrentUserTopics(
    userGoogleId: string,
    query: QueryType,
  ): Promise<TopicsResponse> {
    const user = await this.usersService.findByGoogleId(userGoogleId);
    const [topics, total] = await this.topicsRepository.findAndCount({
      where: [{ user: { id: Not(user.id) }, isPrivate: false }],
      order: {
        updatedDate: 'DESC',
      },
      take: Number(query.take),
      skip: (Number(query.page) - 1) * Number(query.take),
    });

    return {
      topics: this.reformatterService.topicsForResponse(topics),
      total,
    };
  }

  findOne(id: number) {
    return this.topicsRepository.findOne(id);
  }

  async create(
    userGoogleId: string,
    topicDto: TopicDto,
  ): Promise<TopicForResponse> {
    const { name, isPrivate, topicItems, position, originalTopicId } = topicDto;

    const topic = this.topicsRepository.create({
      name,
      isPrivate,
      position,
      originalTopicId,
      copied: [],
    });

    topic.updatedDate = new Date();
    topic.user = await this.usersService.findByGoogleId(userGoogleId);
    topic.items = await this.topicItemsService.createMany(topicItems);

    await this.topicsRepository.save(topic);

    return this.reformatterService.topicForResponse(topic);
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

    if (topic.originalTopicId) {
      const originalTopic = await this.topicsRepository.findOne(
        topic.originalTopicId,
      );

      this.filterTopicCopiedUsers(originalTopic, topic.user.id);

      await this.topicsRepository.save(originalTopic);
    }

    return this.topicsRepository.remove(topic);
  }

  async copyTopicToUser(id: number, userGoogleId: string, position: string) {
    const topic = await this.topicsRepository.findOne(id);
    const user = await this.usersService.findByGoogleId(userGoogleId);

    if (topic.user.id === user.id) {
      throw new BadRequestException('You cannot copy your own topic');
    }

    const isCopiedAlready = topic.copied.some((userWhoWantsCopy) => {
      return userWhoWantsCopy.id === user.id;
    });
    if (isCopiedAlready) {
      throw new BadRequestException('You already copied this topic');
    }

    const copiedTopicDto = this.reformatterService.topicToCopiedDto(
      topic,
      id,
      position,
    );
    await this.create(user.googleId, copiedTopicDto);

    topic.copiedTimes++;
    topic.copied.push(user);

    return this.topicsRepository.save(topic);
  }

  async removeTopicFromUser(id: number, userGoogleId: string) {
    const originalTopic = await this.topicsRepository.findOne(id);
    const user = await this.usersService.findByGoogleId(userGoogleId);

    const certainTopic = await this.topicsRepository.findOne({
      where: [{ originalTopicId: originalTopic.id, user: { id: user.id } }],
    });

    this.filterTopicCopiedUsers(originalTopic, user.id);

    await this.topicsRepository.save(originalTopic);

    return this.topicsRepository.remove(certainTopic);
  }

  filterTopicCopiedUsers(topic: Topic, userId): void {
    topic.copied = topic.copied.filter((user) => {
      return user.id !== userId;
    });
  }
}
