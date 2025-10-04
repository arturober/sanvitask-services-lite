import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { Task } from './task.entity';

@Entity()
export class Subtask {
  @PrimaryKey()
  id!: number;

  @Property({ length: 200, nullable: false })
  description!: string;

  @Property({ nullable: true, default: false })
  completed? = false;

  @Exclude()
  @ManyToOne({
    entity: () => Task,
    fieldName: 'task',
    cascade: [Cascade.MERGE],
    index: 'task_fk',
  })
  task!: Task;
}
