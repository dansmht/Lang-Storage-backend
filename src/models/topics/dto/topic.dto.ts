import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
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

  @IsNumber()
  readonly position: number;

  @IsOptional()
  @IsBoolean()
  readonly isCopied: boolean;

  @IsOptional()
  @IsNumber()
  readonly originalTopicId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopicItemDto)
  topicItems: TopicItemDto[];
}
