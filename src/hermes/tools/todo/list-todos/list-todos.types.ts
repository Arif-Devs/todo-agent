export interface ListTodosToolInput {
    page?: number
    limit?: number
}

export interface ListTodosToolTodo {
    id: string
    title: string
    description: string | null
    completed: boolean
    createdAt: string
    updatedAt: string
}

export interface ListTodosToolResponse {
    success: boolean
    message: string
    data:{
        data: ListTodosToolTodo[]
        pagination: {
            page: number
            limit: number
            total: number
            totalPage: number
        }
    }
}