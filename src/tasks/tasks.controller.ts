
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Delete,
  Patch
} from '@nestjs/common';

import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { filter } from 'rxjs';
import { FilterTasksQueryDtoTs } from './dto/filter-tasks-query.dto.ts.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Controller('tasks')
export class TasksController {

  constructor(
    private readonly tasksService: TasksService,
  ) {}

  // GET /tasks
  @Get()
  findAll(@Query() filters: FilterTasksQueryDtoTs) {
    return this.tasksService.findAll(filters)
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id:number){
    return this.tasksService.findOne(id);
  }
  // POST /tasks
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
  @Delete(':id')
    remove(@Param('id',ParseIntPipe) id: number){
      return this.tasksService.remove(id);
    
  }
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string,@Body() updateTaskDto: UpdateTaskDto)
  {
    return this.tasksService.update(id, updateTaskDto);
  }
}
