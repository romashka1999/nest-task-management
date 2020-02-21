import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

import { TaskStatus } from "../taskStatus.enum";


export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    page: number;

    @IsOptional()
    pageSize: number;
}