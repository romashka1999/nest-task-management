import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/createTask.dto';

@Injectable()
export class TasksService {

    private tasks: Array<Task> = [];

    getAllTasks(): Array<Task> {
        return [...this.tasks];
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

}
