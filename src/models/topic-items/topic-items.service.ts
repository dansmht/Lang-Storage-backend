import { Injectable } from '@nestjs/common';

import { CreateTopicItemDto } from './dto/create-topic-item.dto';
import { UpdateTopicItemDto } from './dto/update-topic-item.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { TopicItem } from './entities/topic-item.entity';
import { LocalesService } from '../locales/locales.service';

@Injectable()
export class TopicItemsService {
  constructor(
    @InjectRepository(TopicItem)
    private topicItemsRepository: Repository<TopicItem>,
    private localesService: LocalesService,
  ) {}

  create(createTopicItemDto: CreateTopicItemDto) {
    return 'This action adds a new topicItem';
  }

  createMany(topicItems: CreateTopicItemDto[]) {
    const mappedTopicItems = topicItems.map(async (item) => {
      const nativeLocale = await this.localesService.findOneByName(
        item.nativeLocale,
      );
      const targetLocale = await this.localesService.findOneByName(
        item.targetLocale,
      );

      // TODO examples

      return {
        ...item,
        nativeLocale,
        targetLocale,
      };
    });

    // const topicItemsToSave = this.topicItemsRepository.create(mappedTopicItems);
    // this.topicItemsRepository.save(topicItems);
    return 'This action adds a new topicItem';
  }

  findAll() {
    return `This action returns all topicItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicItem`;
  }

  update(id: number, updateTopicItemDto: UpdateTopicItemDto) {
    return `This action updates a #${id} topicItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicItem`;
  }
}
