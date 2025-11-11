import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(2)
  status?: number;
}
