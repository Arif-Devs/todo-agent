import type { Request, Response } from "express";

import { TodoRepository } from "../repositories/todo.repository.js";

import { TodoService } from "../services/todo.service.js";
import { success } from "zod";

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

  getAll = async (req: Request, res: Response) => {
    const todos = await this.todoService.getAllTodos();

    res.status(200).json({
      success: true,
      message: "Todo retrieved success!",
      data: todos
    })
  }

  getById = async (req: Request, res: Response)=>{
    const {id} = req.params

    if(!id || Array.isArray(id)){
      return res.status(400).json({
      success: false,
      message: "Invalid todo id",
    });
    }
    
    const todo = await this.todoService.getTodoById(id)

    res.status(200).json({
      success: true,
      message: "Todo retrieved success!",
      data: todo
    })
  }

  update = async(req: Request, res: Response)=>{
    const {id} = req.params

    if(!id || Array.isArray(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid id"
      }) 
    }
    
    const todo = await this.todoService.updateTodo(id, req.body)
      
    return res.status(200).json({
      success: true,
      message: "Todo update successful",
      data: todo
    })

  }

  delete = async( req: Request, res: Response)=>{
    const {id} = req.params

    if(!id || Array.isArray(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid id"
      })
    }

    await this.todoService.deleteTodo(id)

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully!"
    })
  }
}
