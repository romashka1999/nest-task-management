import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';


@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

    async getAllTasks() {
        return await this.taskRepository.find();
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if(!task) {
            throw new NotFoundException(`task with id - ${id} does not exist`)
        } 

        return task;
    }

    async createTask(): Promise<Task> {
        return
    }

    async updateTaskStatusById(id: number, status: string): Promise<Task> {
        return 
    }

    async deleteTaskById(id: number): Promise<boolean> {
        return 
    }



}
