import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { EntityRepository } from '@mikro-orm/core';
import { Subtask } from './entities/subtask.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ImageService } from 'src/commons/image/image.service';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: EntityRepository<Task>,
    @InjectRepository(Task)
    private readonly subtaskRepository: EntityRepository<Subtask>,
    private readonly imageService: ImageService,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll({
      populate: ['subtasks'],
      orderBy: { createdAt: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOneOrFail(
      { id },
      { populate: ['subtasks'] },
    );
  }

  async create(task: CreateTaskDto): Promise<Task> {
    if (task.filepath) {
      task.filepath = await this.imageService.saveImage('tasks', task.filepath);
    }

    const newTask = this.taskRepository.create(task);
    await this.taskRepository.getEntityManager().persistAndFlush(newTask);
    return newTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneOrFail(id);
    Object.assign(task, updateTaskDto);
    console.log(updateTaskDto);
    await this.taskRepository.getEntityManager().persistAndFlush(task);
    return task;
  }

  async remove(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneOrFail({ id });

    if (task.filepath) {
      await this.imageService.removeImage(task.filepath).catch(console.error);
    }
    await this.taskRepository.getEntityManager().removeAndFlush(task);
    return task;
  }

  async addSubtask(taskId: number, description: string): Promise<Subtask> {
    const task = await this.taskRepository.findOneOrFail({ id: taskId });

    const newSubtask = this.subtaskRepository.create({
      description,
      task: task.id,
    });
    task.subtasks.add(newSubtask);
    await this.taskRepository.getEntityManager().persistAndFlush(task);
    return newSubtask;
  }

  async removeSubtask(id: number): Promise<void> {
    const subtask = await this.subtaskRepository.findOneOrFail({ id });
    const task = await this.taskRepository.findOneOrFail(
      {
        id: subtask.task.id,
      },
      {
        populate: ['subtasks'],
      },
    );

    task.subtasks.remove(subtask);
    await this.taskRepository.getEntityManager().persistAndFlush(task);
  }

  async updateSubtask(
    id: number,
    updateSubtaskDto: UpdateSubtaskDto,
  ): Promise<Subtask> {
    const subtask = await this.subtaskRepository.findOneOrFail({ id });

    subtask.description = updateSubtaskDto.description ?? subtask.description;
    subtask.completed = updateSubtaskDto.completed ?? subtask.completed;

    await this.subtaskRepository.getEntityManager().persistAndFlush(subtask);
    return subtask;
  }
}
