import { env } from "../../../../core/config/env.js";
import type { CreateTodoToolInput, CreateTodoToolResponse } from "./create-todo.types.js";

const TODO_API_URL = process.env.TODO_API_URL

if(!TODO_API_URL) throw new Error ("TODO_API_URL is not configured")

export const createTodoTool = async(input: CreateTodoToolInput): Promise<CreateTodoToolResponse> =>{
    const response = await fetch(`${env.TODO_API_URL}/api/v1/todos`, {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(input)

    })
    const result = (await response.json()) as CreateTodoToolResponse
    return result
}