import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AuthenticatedGuard } from '../../auth/guards';
import { UserGoogleId } from '../../utils/decorators/user-google-id.decorator';
import { TopicsService } from './topics.service';
import { TopicDto } from './dto/topic.dto';

@Controller('topics')
// @UseGuards(AuthenticatedGuard)
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  create(@Body() createTopicDto: TopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  findAll(@UserGoogleId() userGoogleId: string) {
    return this.topicsService.findAll(userGoogleId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() topicDto: TopicDto) {
    return this.topicsService.update(+id, topicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(+id);
  }
}
