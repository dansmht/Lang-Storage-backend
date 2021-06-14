import { IsNumber } from 'class-validator';

export class UpdatePositionDto {
  @IsNumber()
  readonly position: string;
}
