import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createPropertyDto: CreateTaskDto,
  ) {
    return {
      task: await this.tasksService.create(createPropertyDto),
    };
  }

  @Get()
  async findAll() {
    return { tasks: await this.tasksService.findAll() };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { task: await this.tasksService.findOne(+id) };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    UpdateTaskDto: UpdateTaskDto,
  ) {
    return { task: await this.tasksService.update(+id, UpdateTaskDto) };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.tasksService.remove(+id);
  }
}
