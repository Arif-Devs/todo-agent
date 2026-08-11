import { threadId } from "node:worker_threads";
import { TodoRepository } from "../repositories/todo.repository.js";

import type { CreateTodoDto } from "../validations/todo.validation.js";
import { AppError } from "../../../core/errors/app-error.js";

export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(payload: CreateTodoDto) {
    const todo = await this.todoRepository.create(payload);
    return todo;
  }

  async getAllTodos() {
    return this.todoRepository.findAll();
  }

  async getTodoById(id: string){
    const todo = await this.todoRepository.findById(id)

    if(!todo){
      throw new AppError("Todo not found!", 400)
    }
    return todo
  }
  
}
