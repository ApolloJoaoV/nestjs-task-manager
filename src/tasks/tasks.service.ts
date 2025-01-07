import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`Tarefa com ID "${id}" não encontrada.`);
        }

        return found;
    }

    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    deleteTask(id: string): Promise<void> {
        return this.taskRepository.deleteTask(id);
    }

    createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(CreateTaskDto);
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
}
