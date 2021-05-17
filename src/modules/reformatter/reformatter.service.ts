import { Injectable } from '@nestjs/common';

import { Topic } from '../../models/topics/entities/topic.entity';
import { TopicResponse } from '../../utils/response-types';

@Injectable()
export class ReformatterService {
  topicsForResponse(topics: Topic[]): TopicResponse[] {
    return topics.map(this.topicForResponse);
  }

  topicForResponse(topic: Topic): TopicResponse {
    const { position, isPrivate, name, user, id, items, updatedDate } = topic;

    return {
      id,
      name,
      isPrivate,
      position,
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
    };
  }
}