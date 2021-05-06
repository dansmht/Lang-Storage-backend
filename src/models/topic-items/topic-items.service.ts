import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TopicItemDto } from './dto/topic-item.dto';
import { TopicItem } from './entities/topic-item.entity';
import { LocalesService } from '../locales/locales.service';
import { ExamplesService } from '../examples/examples.service';

@Injectable()
export class TopicItemsService {
  constructor(
    @InjectRepository(TopicItem)
    private topicItemsRepository: Repository<TopicItem>,
    private localesService: LocalesService,
    private examplesService: ExamplesService,
  ) {}

  findAll() {
    return `This action returns all topicItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicItem`;
  }

  create(topicItemDto: TopicItemDto) {
    return 'This action adds a new topicItem';
  }

  async createMany(topicItems: TopicItemDto[]) {
    const mappedTopicItems = await Promise.all(
      topicItems.map(async (item) => {
        const nativeLocale = await this.localesService.findOneByName(
          item.nativeLocale,
        );
        const targetLocale = await this.localesService.findOneByName(
          item.targetLocale,
        );

        const examples = this.examplesService.createMany(item.examples);

        return {
          nativeLocale,
          nativeText: item.nativeText,
          targetLocale,
          targetText: item.targetText,
          examples,
        };
      }),
    );

    return this.topicItemsRepository.create(mappedTopicItems);
  }

  remove(id: number) {
    return `This action removes a #${id} topicItem`;
  }
}
