import { env } from "../../../../core/config/env.js";
import { normalizeToolError } from "../../../errors/normalize-tool-error.js";
import { ToolError } from "../../../errors/tools-error.js";
import type { GetTodoToolInput, GetTodoToolResponse } from "./get-todo.types.js";
import { getTodoToolSchema } from "./get-todo.validation.js";
normalizeToolError


export const getTodoTool = async(input: GetTodoToolInput):Promise<GetTodoToolResponse> =>{

    try {
    const validatedInput = getTodoToolSchema.parse(input);
    let response: Response;

    try {
      response = await fetch(
        `${env.TODO_API_URL}/api/v1/todos/${validatedInput.id}`,
        {
          method: "GET",
        }
      );
    } catch {
      throw new ToolError("TODO_API_UNAVAILABLE", "Todo API is unavailable");
    }

    if (!response.ok) {
      if (response.status === 404) {
        throw new ToolError("TODO_NOT_FOUND","Todo not found",404);
      }

      throw new ToolError("TODO_GET_FAILED","Failed to get todo",
        response.status
      );
    }

    return (await response.json()) as GetTodoToolResponse;

  } catch (error) {
    throw normalizeToolError(error);
  }
};