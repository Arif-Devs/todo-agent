import { TodoRepository } from "../repositories/todo.repository.js";

import type { CreateTodoDto, TodoQueryDto, UpdateTodoDto } from "../validations/todo.validation.js";
import { NotFoundError } from "../../../core/errors/not-found.error.js";


export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}


  //create todo
  async createTodo(payload: CreateTodoDto) {
    return this.todoRepository.create(payload);
  
  }

  //Get all todos
  async getAllTodos(query: TodoQueryDto) {
    const result = await this.todoRepository.findAll(query)
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

  // get by id
  async getTodoById(id: string){
    const todo = await this.todoRepository.findById(id)

    if(!todo) throw new NotFoundError("Todo not found!")
    return todo
  }

  //update todo by patch
  async updateTodo(id: string, payload: UpdateTodoDto){
    const existingTodo = await this.todoRepository.findById(id)
     
    if(!existingTodo) throw new NotFoundError("Todo not found")

    return this.todoRepository.update(id, payload)
  
  } 

  //delete todo
  async deleteTodo(id: string){
    const existingTodo = await this.todoRepository.findById(id)

    if(!existingTodo) throw new NotFoundError("Todo not found")
    
    await this.todoRepository.delete(id)
    return existingTodo
  }
}
