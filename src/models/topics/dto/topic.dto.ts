import {
  IsBoolean,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { TopicItemDto } from '../../topic-items/dto/topic-item.dto';

export class TopicDto {
  @IsBoolean()
  readonly isPrivate: boolean;

  @IsString()
  @MinLength(1)
  readonly name: string;

  @ValidateNested({ each: true })
  @Type(() => TopicItemDto)
  topicItems: TopicItemDto[];
}
