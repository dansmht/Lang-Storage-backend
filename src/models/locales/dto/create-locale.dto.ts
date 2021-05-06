import { IsString } from 'class-validator';

export class CreateLocaleDto {
  @IsString()
  readonly name: string;
}
