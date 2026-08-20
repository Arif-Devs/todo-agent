import type { Request, Response } from "express";

import { TodoRepository } from "../repositories/todo.repository.js";

import { TodoService } from "../services/todo.service.js";
import type { TodoParams, TodoQueryDto, UpdateTodoDto } from "../validations/todo.validation.js";
import { AppError } from "../../../core/errors/app-error.js";



export class TodoController {
  private readonly todoService: TodoService;

  constructor() {
    const todoRepository = new TodoRepository();
    this.todoService = new TodoService(todoRepository);
  }

  
  create = async (req: Request, res: Response) => {
    const todo = await this.todoService.createTodo(req.body);

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  };

  //get all todos
  getAll = async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as TodoQueryDto;

    const result = await this.todoService.getAllTodos(query);

    return res.status(200).json({
      success: true,
      message: "Todos retrieved successfully!",
      ...result,
    });

  } catch (error) {

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

  getById = async (req: Request,res: Response) => {
  const { id } = req.params;

  const todo = await this.todoService.getTodoById(id as string);

  return res.status(200).json({
    success: true,
    message: "Todo retrieved success!",
    data: todo,
  });
};

  update = async (req: Request,res: Response) => {
  const { id } = req.params;

  const todo = await this.todoService.updateTodo(id as string,req.body);

  return res.status(200).json({
    success: true,
    message: "Todo update successful",
    data: todo,
  });
};

  delete = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await this.todoService.deleteTodo(id as string);

  return res.status(200).json({
    success: true,
    message: "Todo deleted successfully!",
  });
};
}
