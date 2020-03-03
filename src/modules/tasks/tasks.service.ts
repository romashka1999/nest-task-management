import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/createTask.dto';
import { GetTasksFilterDto } from './dtos/getTasksFilter.dto';
import { User } from '../users/user.entity';


@Injectable()
export class TasksService {

    private readonly logger = new Logger('TasksService');
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

    async getTasks(getTasksFilterDto: GetTasksFilterDto, user: User) {
        return await this.taskRepository.getTasks(getTasksFilterDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        try {
            const task = await this.taskRepository.findOne( {
                where: {
                    id: id, 
                    userId: user.id
                }
            }); 

            if(!task) {
                this.logger.error(`task with id - ${id} does not exist`);
                throw new NotFoundException(`task with id - ${id} does not exist`);
            } 

            return task;
        } catch (error) {
            if(!error.status) {
                throw new InternalServerErrorException(error);
            }
            throw error;
        }
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async updateTaskStatusById(id: number, status: string, user: User): Promise<any> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        try {
            await task.save();
            return task;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteTaskById(id: number, user: User): Promise<boolean> {
        try {
            const deletedTask = await this.taskRepository.delete({
                id: id,
                userId: user.id
            });

            if(!deletedTask.affected) {
                throw new NotFoundException(`task with id - ${id} does not exist`)
            }

            return true;
        } catch (error) {
            if(!error.status) {
                throw new InternalServerErrorException(error);
            }
            throw error;
        }
    }



}
