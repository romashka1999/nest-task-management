import { Repository, EntityRepository } from "typeorm";

import { Task } from "./task.entity";
import { CreateTaskDto } from "./dtos/createTask.dto";
import { TaskStatus } from "./taskStatus.enum";
import { GetTasksFilterDto } from "./dtos/getTasksFilter.dto";
import { pagination, Ipagination } from "src/shared/pagination";
import { InternalServerErrorException } from "@nestjs/common";
import { User } from "../users/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    public async getTasks(getTasksFilterDto: GetTasksFilterDto, user: User): Promise<Array<Task>> {
        const { status, search, page, pageSize } = getTasksFilterDto;
        const query = this.createQueryBuilder('task');
        
        query.where('task.userId = :userId', {userId: user.id}) // filter with user id

        if(page && pageSize) { //pagination logic
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        // i use query.andWhere method, there is also query.where method ,but query.where method overrides
        // previous query and i want to do all query together :)
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

    public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = new Task();

        const { title, description } = createTaskDto;
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        try {
            await task.save();
            delete task.user; //delete task.user , because return only pure task
            return task;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}