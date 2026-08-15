import { TodoRepository } from "../repositories/todo.repository.js";

import type { CreateTodoDto, TodoQueryDto, UpdateTodoDto } from "../validations/todo.validation.js";
import { AppError } from "../../../core/errors/app-error.js";

export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(payload: CreateTodoDto) {
    const todo = await this.todoRepository.create(payload);
    return todo;
  }

  //Get all todos
  async getAllTodos(query: TodoQueryDto) {
    
    const result = await this.todoRepository.findAll(query);

    const totalPages = Math.ceil(result.total / query.limit)

    return{
      data: result.data,
      pagination:{
        page: query.page,
        limit: query.limit,
        total: result.total,
        totalPages
      }
    }
  }

  async getTodoById(id: string){
    const todo = await this.todoRepository.findById(id)

    if(!todo){
      throw new AppError("Todo not found!", 400)
    }
    return todo
  }

  async updateTodo(id: string, payload: UpdateTodoDto){
    const existingTodo = await this.todoRepository.findById(id)
     
    if(!existingTodo) throw new AppError("Todo not found", 404)

    return this.todoRepository.update(id, payload)
  
  } 
  async deleteTodo(id: string){
    const existingTodo = await this.todoRepository.findById(id)

    if(!existingTodo) throw new AppError("Todo not found", 404)
    
    await this.todoRepository.delete(id)
    return existingTodo
  }
}
