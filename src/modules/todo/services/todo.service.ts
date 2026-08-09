import { TodoRepository } from "../repositories/todo.repository.js";

import type { CreateTodoDto } from "../validations/todo.validation.js";

export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(payload: CreateTodoDto) {
    const todo = await this.todoRepository.create(payload);
    return todo;
  }

  async getAllTodos() {
    return this.todoRepository.findAll();
  }
}
