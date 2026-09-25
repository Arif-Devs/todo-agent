export interface GetTodoToolInput {
    id: string
}

export interface GetTodoToolTodo {
    id: string
    title: string
    description: string | null
    completed: boolean
    createdAt: string
    updatedAt: string

}

export interface GetTodoToolResponse{
    success: boolean
    message: string
    data: GetTodoToolTodo
}