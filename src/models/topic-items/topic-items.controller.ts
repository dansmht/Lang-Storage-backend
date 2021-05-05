import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicItemsService } from './topic-items.service';
import { CreateTopicItemDto } from './dto/create-topic-item.dto';
import { UpdateTopicItemDto } from './dto/update-topic-item.dto';

@Controller('topic-items')
export class TopicItemsController {
  constructor(private readonly topicItemsService: TopicItemsService) {}

  @Post()
  create(@Body() createTopicItemDto: CreateTopicItemDto) {
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
  update(@Param('id') id: string, @Body() updateTopicItemDto: UpdateTopicItemDto) {
    return this.topicItemsService.update(+id, updateTopicItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicItemsService.remove(+id);
  }
}
