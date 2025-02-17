import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: TaskRepository,
      useFactory: (dataSource: DataSource) => {
        return new TaskRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [TasksService],
})
export class TasksModule {}
