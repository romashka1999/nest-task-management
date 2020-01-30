import { Repository, EntityRepository } from "typeorm"
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/createTask.dto";
import { TaskStatus } from "./taskStatus.enum";
import { GetTasksFilterDto } from "./dto/getTasksFilterDto";
import { pagination, Ipagination } from "src/shared/pagination";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    public async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Array<Task>> {
        const { status, search, page, pageSize } = getTasksFilterDto;
        const query = this.createQueryBuilder('task');

        if(page && pageSize) {
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        if(status) {
            query.andWhere('task.status = :status', {status: status})
        }

        if(search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`})
        }

        const tasks = await query.getMany();
        return tasks;
    }

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = new Task();

        const { title, description } = createTaskDto;
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        await task.save();

        return task;
    }
}