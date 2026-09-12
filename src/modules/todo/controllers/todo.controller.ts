import type { Request, Response } from "express";
import { TodoService } from "../services/todo.service.js";
import type {TodoQueryDto} from "../validations/todo.validation.js";
import { toTodoResponse } from "../mappers/todo.mapper.js";
import type { ApiResponse } from "../../../core/types/api-response.js";
import type { TodoResponseDto } from "../dto/todo-response.dto.js";
import type { TodoListResponseDto } from "../dto/todo-list-response.dto.js";

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  //create todo
  create = async (req: Request, res: Response) => {
    const todo = await this.todoService.createTodo(req.body);

    const response : ApiResponse<TodoResponseDto> = {
    
      success: true,
      message: "Todo created successfully",
      data: toTodoResponse(todo)
    }

    return res.status(201).json(response)
  };

  //get all todos
  getAll = async (req: Request, res: Response) => {
    const query = req.query as unknown as TodoQueryDto;

    const result = await this.todoService.getAllTodos(query);
    const response: ApiResponse<TodoListResponseDto> ={
      success: true,
      message: "Todo retrieved success!",
      data:{
        data: result.data.map(toTodoResponse),

        pagination: result.pagination
      }
    }
    return res.status(200).json(response)
  } 

  // get by id
  getById = async (req: Request,res: Response) => {
  const { id } = req.params;

  const todo = await this.todoService.getTodoById(id as string);
  
  const response : ApiResponse<TodoResponseDto> = {
    success: true,
    message: "Todo retrieved success!",
    data: toTodoResponse(todo)
  }
   return res.status(200).json(response)
};

//update by patch
  update = async (req: Request,res: Response) => {
  const { id } = req.params;

  const todo = await this.todoService.updateTodo(id as string,req.body);

  const response: ApiResponse<TodoResponseDto> = {
    success: true,
    message: "Todo updated successfully!",
    data: toTodoResponse(todo)
  };
  return res.status(200).json(response);
};

  delete = async (req: Request,res: Response) => {
  const { id } = req.params;

  await this.todoService.deleteTodo(id as string);

  return res.status(200).json({
    success: true,
    message: "Todo deleted successfully!",
  
  });
 };
}
