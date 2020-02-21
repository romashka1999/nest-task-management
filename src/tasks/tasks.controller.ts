import { Controller, Get, Post, Body, Param, Delete, Patch, Query,
UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskStatusValidationpipe } from './pipes/taskStatusValidationPipe';
import { CreateTaskDto } from './dtos/createTask.dto';
import { GetTasksFilterDto } from './dtos/getTasksFilter.dto';


@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Promise<Array<Task>>{
        return this.tasksService.getTasks(getTasksFilterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationpipe) status: string
    ): Promise<Task> {
        return this.tasksService.updateTaskStatusById(id, status);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.tasksService.deleteTaskById(id);
    }
    
    
}
