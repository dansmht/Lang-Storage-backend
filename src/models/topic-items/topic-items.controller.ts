import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { TopicItemsService } from './topic-items.service';
import { TopicItemDto } from './dto/topic-item.dto';

@Controller('topic-items')
export class TopicItemsController {
  constructor(private readonly topicItemsService: TopicItemsService) {}

  @Post()
  create(@Body() createTopicItemDto: TopicItemDto) {
    return this.topicItemsService.create(createTopicItemDto);
  }

  @Get()
  findAll() {
    return this.topicItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() topicItemDto: TopicItemDto) {
    return this.topicItemsService.update(+id, topicItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicItemsService.remove(+id);
  }
}
