import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  description?: string;

  @IsDateString(
    { strict: true },
    { message: 'deadLine must be a valid ISO 8601 date string' },
  )
  deadLine?: Date;

  @IsString()
  address?: string;

  @IsString()
  filepath?: string;

  @IsNumber()
  lat?: number;

  @IsNumber()
  lng?: number;
}
