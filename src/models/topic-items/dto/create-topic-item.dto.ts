import {
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateExampleDto } from '../../examples/dto/create-example.dto';

export class CreateTopicItemDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly nativeLocale: string;

  @IsString()
  @MaxLength(40)
  readonly nativeText: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly targetLocale: string;

  @IsString()
  @MaxLength(40)
  readonly targetText: string;

  @ValidateNested({ each: true })
  @Type(() => CreateExampleDto)
  examples: CreateExampleDto[];
}
