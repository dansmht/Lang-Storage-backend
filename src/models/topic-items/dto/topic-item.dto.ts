import {
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ExampleDto } from '../../examples/dto/example.dto';

export class TopicItemDto {
  @IsNumber()
  readonly position: number;

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
  @Type(() => ExampleDto)
  examples: ExampleDto[];
}
