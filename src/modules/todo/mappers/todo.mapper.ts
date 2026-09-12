import type { TodoEntity } from "../entities/todo.entities.js";
import type { TodoResponseDto } from "../dto/todo-response.dto.js";

export function toTodoResponse(todo: TodoEntity):TodoResponseDto{
    return{
        id: todo.id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt
    }
}