import { IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { TopicItemDto } from '../../topic-items/dto/topic-item.dto';

export class TopicDto {
  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsString()
  readonly userGoogleId: string;

  @ValidateNested({ each: true })
  @Type(() => TopicItemDto)
  topicItems: TopicItemDto[];
}
