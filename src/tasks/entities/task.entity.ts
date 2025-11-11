import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Subtask } from './subtask.entity';

export enum TaskStatus {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
}

@Entity()
export class Task {
  @PrimaryKey()
  id!: number;

  @Property({ length: 200, nullable: false })
  title!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ nullable: true, default: TaskStatus.PENDING })
  status?: number = TaskStatus.PENDING;

  @Property({
    length: 250,
    nullable: true,
    serializer: (p: string) => {
      if (!p) {
        return null;
      }
      const baseUrl =
        (process.env.BASE_URL || 'http://localhost:3000') +
        (process.env.BASE_PATH || '');
      return `${baseUrl}/${p}`;
    },
  })
  filepath?: string;

  @Property({
    nullable: true,
    type: 'datetime',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date = new Date();

  @Property({ nullable: true })
  deadLine?: Date;

  @Property({ columnType: 'double', nullable: true, default: 0 })
  lat?: number = 0;

  @Property({ columnType: 'double', nullable: true, default: 0 })
  lng?: number = 0;

  @Property({ length: 250, nullable: true })
  address?: string;

  @OneToMany(() => Subtask, 'task', {
    cascade: [Cascade.ALL],
  })
  subtasks = new Collection<Subtask>(this);
}
