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

    getTaskById(id: string): Task {
        return this.tasks.find( (task) => {
            task.id === id;
        });
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

    deleteTaskById(id: string): boolean{
        let finded = false;
        this.tasks.forEach((task, idx) => {
            if(task.id === id) {
                this.tasks.splice(idx, 1);
                finded = true;
            }
        });
        return finded ? true: false;
    }

}
