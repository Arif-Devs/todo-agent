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
  };
}
