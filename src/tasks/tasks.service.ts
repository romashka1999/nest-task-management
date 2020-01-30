import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskStatus } from './taskStatus.enum';
import { GetTasksFilterDto } from './dto/getTasksFilterDto';


@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

    async getTasks(getTasksFilterDto: GetTasksFilterDto) {
        return await this.taskRepository.getTasks(getTasksFilterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id); // 

        if(!task) {
            throw new NotFoundException(`task with id - ${id} does not exist`)
        } 

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async updateTaskStatusById(id: number, status: string): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    async deleteTaskById(id: number): Promise<boolean> {
        const deletedTask = await this.taskRepository.delete(id);

        if(!deletedTask.affected) {
            throw new NotFoundException(`task with id - ${id} does not exist`)
        }

        return true;
    }



}
