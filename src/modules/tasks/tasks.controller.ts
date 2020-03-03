import { Controller, Get, Post, Body, Param, Delete, Patch, Query,
UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskStatusValidationpipe } from './pipes/taskStatusValidationPipe';
import { CreateTaskDto } from './dtos/createTask.dto';
import { GetTasksFilterDto } from './dtos/getTasksFilter.dto';
import { GetUser } from '../auth/getUser.decorator';
import { User } from '../users/user.entity';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private readonly logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(
        @Query() getTasksFilterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Array<Task>>{
        this.logger.verbose(user);
        return this.tasksService.getTasks(getTasksFilterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationpipe) status: string,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.updateTaskStatusById(id, status, user);
    }

    @Delete('/:id')
    deleteTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<boolean> {
        return this.tasksService.deleteTaskById(id, user);
    }
}
