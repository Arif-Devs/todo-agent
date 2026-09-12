import { TodoRepository } from "../modules/todo/repositories/todo.repository.js";

import { TodoService } from "../modules/todo/services/todo.service.js";

import { TodoController } from "../modules/todo/controllers/todo.controller.js";

const todoRepository = new TodoRepository()
const todoService = new TodoService(todoRepository)
export const todoController = new TodoController(todoService)