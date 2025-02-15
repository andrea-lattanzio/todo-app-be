import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import UuidValidationPipe from 'src/common/pipes/UUIDValidation.pipe';
import { GetUser } from 'src/common/decorators/getuser.decorator';
import { TaskDto } from './dtos/task.dto';

@ApiTags('auth')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new Task',
    description:
      'This endpoint creates a new task and links it to existing categories and tags',
  })
  @ApiBody({
    description: 'Task information',
    type: CreateTaskDto,
  })
  @ApiCreatedResponse({
    description: 'The task was succesfully created',
    type: TaskDto,
  })
  create(
    @GetUser('id') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDto> {
    return this.taskService.create(userId, createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all Tasks',
    description:
      'This endpoint returns a list of all tasks with the name of the related tags, categories and users',
  })
  findAll(@GetUser('id') userId: string): Promise<TaskDto[]> {
    return this.taskService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one Task with related entities in detail',
    description:
      'This endpoint returns a single tag with all the related entities in detail',
  })
  findOne(@Param('id', UuidValidationPipe) id: string): Promise<TaskDto> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one Task',
    description:
      'This endpoint updates all the task info and its relationships',
  })
  @ApiBody({
    description: 'Updated Task information',
    type: UpdateTaskDto,
  })
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDto> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove one Task',
    description: 'This endpoint removes a task',
  })
  remove(@Param('id', UuidValidationPipe) id: string): Promise<TaskDto> {
    return this.taskService.remove(id);
  }
}
