import { IsOptional, IsString } from 'class-validator';

export class ExampleDto {
  @IsOptional()
  @IsString()
  readonly text: string;
}
