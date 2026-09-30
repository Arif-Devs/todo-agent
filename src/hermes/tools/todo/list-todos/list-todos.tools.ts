import { env } from "../../../../core/config/env.js";
import type { ListTodosToolInput, ListTodosToolResponse } from "./list-todos.types.js";
import { listTodosToolSchema } from "./list-todo.validation.js";
import { ToolError } from "../../../errors/tools-error.js";
import { normalizeToolError } from "../../../errors/normalize-tool-error.js";
import { url } from "inspector/promises";



export const listTodosTool = async(input: ListTodosToolInput = {}): Promise<ListTodosToolResponse> =>{

    try {
    const validatedInput = listTodosToolSchema.parse(input);
    const searchParams = new URLSearchParams();

    if (validatedInput.page !== undefined) {
      searchParams.set("page", String(validatedInput.page));
    }

    if (validatedInput.limit !== undefined) {
      searchParams.set("limit", String(validatedInput.limit));
    }

    const queryString = searchParams.toString();

    const url = queryString
      ? `${env.TODO_API_URL}/api/v1/todos?${queryString}`:`${env.TODO_API_URL}/todos`;

    let response: Response;

    try {
      response = await fetch(url, {
        method: "GET",
      });
    } catch {
      throw new ToolError("TODO_API_UNAVAILABLE","Todo API is unavailable");
    }

    if (!response.ok) {
      throw new ToolError("TODO_LIST_FAILED","Failed to retrieve todos", response.status);
    }

    return (await response.json()) as ListTodosToolResponse;

  } catch (error) {
    throw normalizeToolError(error);
  }
};