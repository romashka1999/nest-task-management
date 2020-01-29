import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {

    private tasks: Array<Task> = [];

    getAllTasks(): Array<Task> {
        return [...this.tasks];
    }

}
