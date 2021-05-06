import { IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateTopicItemDto } from '../../topic-items/dto/create-topic-item.dto';

export class CreateTopicDto {
  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsString()
  readonly userGoogleId: string;

  @ValidateNested({ each: true })
  @Type(() => CreateTopicItemDto)
  topicItems: CreateTopicItemDto[];
}
