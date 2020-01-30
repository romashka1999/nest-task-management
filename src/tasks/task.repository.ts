import { Repository, EntityRepository } from "typeorm"
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/createTask.dto";
import { TaskStatus } from "./taskStatus.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

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