import { env } from "../../../../core/config/env.js";
import type { GetTodoToolInput, GetTodoToolResponse } from "./get-todo.types.js";

export const getTodoTool = async(input: GetTodoToolInput):Promise<GetTodoToolResponse> =>{
    
    const response = await fetch(`${env.TODO_API_URL}/api/v1/todos/${input.id}`,{
        method: "GET"
    })

    const result = (await response.json()) as GetTodoToolResponse
    return result
}

