import type { TodoResponseDto } from "./todo-response.dto.js";

export interface TodoListResponseDto {
    data: TodoResponseDto[]

    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

