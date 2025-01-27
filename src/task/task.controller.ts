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
import { CreateTaskDto, Task } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { UuidValidationPipe } from 'src/common/pipes/UUIDValidation.pipe';

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
    type: Task,
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all Tasks with related tag, category and users',
    description:
      'This endpoint returns a list of all tasks with the name of the related tags, categories and users',
  })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one Task with related entities in detail',
    description:
      'This endpoint returns a single tag with all the related entities in detail',
  })
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one task',
    description:
      'This endpoint updates all the task info and its relationships',
  })
  @ApiBody({
    description: 'Updated Task information',
    type: UpdateTaskDto,
  })
  update(@Param('id', UuidValidationPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove one task',
    description:
      'This endpoint removes a task',
  })
  remove(@Param('id', UuidValidationPipe) id: string) {
    return this.taskService.remove(id);
  }
}