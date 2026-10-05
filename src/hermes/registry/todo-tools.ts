import { createTodoTool } from "../tools/todo/create-todo/create-todo.tool.js";
import { deleteTodoTool } from "../tools/todo/delete-todo/delete-todo.tool.js";
import { getTodoTool } from "../tools/todo/get-todo/get-todo.tool.js";
import { listTodosTool } from "../tools/todo/list-todos/list-todos.tools.js";
import { updateTodoTool } from "../tools/todo/update-todo/update-todo.tool.js";

export const todoTools = {
    createTodo: createTodoTool,
    listTodos: listTodosTool,
    getTodo: getTodoTool,
    updateTodo: updateTodoTool,
    deleteTodo: deleteTodoTool

}