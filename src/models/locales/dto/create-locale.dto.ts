import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLocaleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly name: string;
}
