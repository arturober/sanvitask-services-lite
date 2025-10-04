import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CommonsModule } from 'src/commons/commons.module';

@Module({
  imports: [MikroOrmModule.forFeature(['Task', 'Subtask']), CommonsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
