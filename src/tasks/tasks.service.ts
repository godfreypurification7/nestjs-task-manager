import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.interface.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { FilterTasksQueryDtoTs } from './dto/filter-tasks-query.dto.ts.js';
import { Update } from 'vite';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {

  private readonly tasks: Task[] = [
    {
      id: 1,
      title: 'Learn NestJS',
      description: 'Study NestJS fundamentals',
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Learn TypeScript',
      description: 'Practice TypeScript',
      isCompleted: true,
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Build Task Manager',
      description: 'Develop REST API',
      isCompleted: false,
      createdAt: new Date(),
    },
  ];

// GET ALL TASKS WITH FILTERING
findAll(filters: FilterTasksQueryDtoTs): Task[] {
  const { title, isCompleted } = filters;

  let tasks = this.tasks;

  if (isCompleted !== undefined) {
    tasks = tasks.filter(
      task => task.isCompleted === isCompleted
    );
  }

  if (title) {
    tasks = tasks.filter(task =>
      task.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  return tasks;
}

// REMOVE TASK BY ID
remove(id: number) {
  const taskIndex = this.tasks.findIndex(
    task => task.id === id
  );

  if (taskIndex === -1) {
    return null;
    }

  return this.tasks.splice(taskIndex, 1)[0];
}
update(id:any, updateTaskDto:UpdateTaskDto){
  const task=this.findOne(id);
  if(!task){
    return null;
  }
  Object.assign(task, updateTaskDto);
  return task;
}

// CREATE NEW TASK
create(createTaskDto: CreateTaskDto): Task {
  const newTask: Task = {
    id: this.tasks.length
      ? Math.max(...this.tasks.map(task => task.id)) + 1
      : 1,
    createdAt: new Date(),
    title: createTaskDto.title,
    description: createTaskDto.description ?? '',
    isCompleted: createTaskDto.isCompleted ?? false,
  };

  this.tasks.push(newTask);

  return newTask;
}

// FIND TASK BY ID
findOne(id: number): Task {
  const task = this.tasks.find(task => task.id === id);

  if (!task) {
    throw new NotFoundException(`Task with ID ${id} not found`);
  }

  return task;
}
}