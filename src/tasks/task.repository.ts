import { Repository, EntityRepository } from "typeorm";

import { Task } from "./task.entity";
import { CreateTaskDto } from "./dtos/createTask.dto";
import { TaskStatus } from "./taskStatus.enum";
import { GetTasksFilterDto } from "./dtos/getTasksFilterDto";
import { pagination, Ipagination } from "src/shared/pagination";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    public async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Array<Task>> {
        const { status, search, page, pageSize } = getTasksFilterDto;
        const query = this.createQueryBuilder('task');

        query.addOrderBy('ASC'); //ordering ascending

        if(page && pageSize) { //pagination logic
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        // i use query.andWhere method, there is also query.where method ,but query.where method overrides
        // previous query i want to do all query together :)
        if(status) { 
            query.andWhere('task.status = :status', {status: status}) //search by status
        }

        if(search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`})
        } //search by search word which likes any title or description

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = new Task();

        const { title, description } = createTaskDto;
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        try {
            await task.save();
            return task;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}