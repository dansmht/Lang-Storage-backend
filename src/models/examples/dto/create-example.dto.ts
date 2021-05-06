import { IsOptional, IsString } from 'class-validator';

export class CreateExampleDto {
  @IsOptional()
  @IsString()
  readonly text: string;
}
