import { Injectable } from '@nestjs/common';
import { CreateTopicItemDto } from './dto/create-topic-item.dto';
import { UpdateTopicItemDto } from './dto/update-topic-item.dto';

@Injectable()
export class TopicItemsService {
  create(createTopicItemDto: CreateTopicItemDto) {
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
