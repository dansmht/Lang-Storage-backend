import { Injectable } from '@nestjs/common';

import { Topic } from '../../models/topics/entities/topic.entity';
import { TopicForResponse } from '../../utils/response-types';
import { TopicDto } from '../../models/topics/dto/topic.dto';

@Injectable()
export class ReformatterService {
  topicsForResponse(topics: Topic[]): TopicForResponse[] {
    return topics.map(this.topicForResponse);
  }

  topicForResponse(topic: Topic): TopicForResponse {
    const {
      position,
      isPrivate,
      name,
      user,
      id,
      items,
      updatedDate,
      copied,
      isCopied,
      copiedTimes,
      originalTopicId,
    } = topic;

    return {
      id,
      name,
      isPrivate,
      position,
      isCopied,
      copiedTimes,
      originalTopicId,
      updatedDate,
      user: {
        name: user.displayName,
        picture: user.picture,
      },
      items: items
        .map((topicItem) => ({
          position: topicItem.position,
          nativeLocale: topicItem.nativeLocale.name,
          nativeText: topicItem.nativeText,
          targetLocale: topicItem.targetLocale.name,
          targetText: topicItem.targetText,
          examples: topicItem.examples.map((example) => example.text),
        }))
        .sort((a, b) => a.position - b.position),
      copied: copied.map((user) => user.googleId),
    };
  }

  topicToCopiedDto(
    topic: Topic,
    originalTopicId: number,
    position: string,
  ): TopicDto {
    const { name, isPrivate, items } = topic;

    return {
      name,
      isPrivate,
      position,
      isCopied: true,
      originalTopicId,
      topicItems: items.map((topicItem) => ({
        position: topicItem.position,
        nativeLocale: topicItem.nativeLocale.name,
        nativeText: topicItem.nativeText,
        targetLocale: topicItem.targetLocale.name,
        targetText: topicItem.targetText,
        examples: topicItem.examples.map((example) => ({ text: example.text })),
      })),
    };
  }
}
