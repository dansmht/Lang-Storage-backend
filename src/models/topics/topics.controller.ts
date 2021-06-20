import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';

import { AuthenticatedGuard } from '../../auth/guards';
import { UserGoogleId } from '../../utils/decorators/user-google-id.decorator';
import { TopicsService } from './topics.service';
import { TopicDto } from './dto/topic.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { TopicForResponse, TopicsResponse } from '../../utils/response-types';
import { QueryType } from '../../utils/types';

@Controller('topics')
@UseGuards(AuthenticatedGuard)
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  async create(
    @UserGoogleId() userGoogleId: string,
    @Body() topicDto: TopicDto,
  ): Promise<TopicForResponse> {
    return this.topicsService.create(userGoogleId, topicDto);
  }

  @Get()
  async findAll(): Promise<TopicForResponse[]> {
    return this.topicsService.findAll();
  }

  @Get('my')
  async findCurrentUserTopics(
    @UserGoogleId() userGoogleId: string,
    @Query() query: QueryType,
  ): Promise<TopicsResponse> {
    return this.topicsService.findCurrentUserTopics(userGoogleId, query);
  }

  @Get('other')
  async findExceptCurrentUserTopics(
    @UserGoogleId() userGoogleId: string,
    @Query() query: QueryType,
  ): Promise<TopicsResponse> {
    return this.topicsService.findExceptCurrentUserTopics(userGoogleId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() topicDto: TopicDto) {
    return this.topicsService.update(+id, topicDto);
  }

  @Patch('position/:id')
  updatePosition(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.topicsService.updatePosition(+id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(+id);
  }

  @Post('copy/:id')
  copyTopicToUser(
    @Param('id') id: string,
    @UserGoogleId() userGoogleId: string,
    @Body('position') position: string,
  ) {
    return this.topicsService.copyTopicToUser(+id, userGoogleId, position);
  }

  @Delete('copy/:id')
  removeTopicFromUser(
    @Param('id') id: string,
    @UserGoogleId() userGoogleId: string,
  ) {
    return this.topicsService.removeTopicFromUser(+id, userGoogleId);
  }
}
