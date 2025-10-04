import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
