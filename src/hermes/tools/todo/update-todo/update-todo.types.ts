export interface UpdateTodoToolInput {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTodoToolTodo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTodoToolResponse {
  success: boolean;
  message: string;
  data: UpdateTodoToolTodo;
}