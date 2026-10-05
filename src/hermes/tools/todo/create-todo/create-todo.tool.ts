import { env } from "../../../../core/config/env.js";
import type { CreateTodoToolInput, CreateTodoToolResponse } from "./create-todo.types.js";
import { createTodoToolSchema } from "./create-todo.validation.js";
import { ToolError } from "../../../errors/tools-error.js";
import { normalizeToolError } from "../../../errors/normalize-tool-error.js";


const TODO_API_URL = process.env.TODO_API_URL
if(!TODO_API_URL) throw new Error ("TODO_API_URL is not configured")

export const createTodoTool = async(input: CreateTodoToolInput): Promise<CreateTodoToolResponse> =>{

   try {
    const validatedInput = createTodoToolSchema.parse(input);
    let response: Response;

  try {
    response = await fetch(
      `${env.TODO_API_URL}/api/v1/todos`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(validatedInput),
      }
    );
  } catch {
    throw new ToolError("TODO_API_UNAVAILABLE", "Todo API is unavailable");
  }
  const responseText = await response.text();
  // console.log("Todo API status:", response.status);
  // console.log("Todo API response:", responseText);

  if (!response.ok) {
    if (response.status === 400) {
      throw new ToolError("INVALID_TODO_DATA", "Todo data is invalid",400);
    }

    throw new ToolError("TODO_CREATE_FAILED", "Failed to create todo", response.status);
  }
  const result = JSON.parse(responseText)
  return result

} catch (error) {
  throw normalizeToolError(error);
}
}