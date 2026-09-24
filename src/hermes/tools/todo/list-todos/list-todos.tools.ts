import { env } from "../../../../core/config/env.js";
import type { ListTodosToolInput, ListTodosToolResponse } from "./list-todos.types.js";

export const listTodosTool = async(input: ListTodosToolInput = {}): Promise<ListTodosToolResponse> =>{
    const searchParams = new URLSearchParams()

    if(input.page !== undefined){
        searchParams.set("page", String(input.page))
    }

    if(input.limit !== undefined){
        searchParams.set("limit", String(input.limit))
    }

    const queryString = searchParams.toString()

    const url = queryString ? `${env.TODO_API_URL}/api/v1/todos?${queryString}`:`${env.TODO_API_URL}/api/v1/todos`

    const response = await fetch(url,{method: "GET"})

    const result = (await response.json()) as ListTodosToolResponse

    return result
}