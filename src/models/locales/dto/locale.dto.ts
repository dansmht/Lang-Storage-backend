import { IsString, MaxLength, MinLength } from 'class-validator';

export class LocaleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly name: string;
}
