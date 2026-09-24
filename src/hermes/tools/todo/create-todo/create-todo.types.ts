export interface CreateTodoToolInput {
    title: string
    description: string
}

export interface CreateTodoToolTodo {
    id: string
    title: string
    description: string | null
    completed: boolean
    createdAt: string
    updatedAt: string
}

export interface CreateTodoToolResponse{
    success: boolean
    message: string
    data: CreateTodoToolTodo
}