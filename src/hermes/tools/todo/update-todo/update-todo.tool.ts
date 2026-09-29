import { env } from "../../../../core/config/env.js";
import { normalizeToolError } from "../../../errors/normalize-tool-error.js";
import { ToolError } from "../../../errors/tools-error.js";
import type {UpdateTodoToolInput, UpdateTodoToolResponse} from "./update-todo.types.js";
import { updateTodoToolSchema } from "./update-todo.validation.js";

export const updateTodoTool = async (input: UpdateTodoToolInput): Promise<UpdateTodoToolResponse> => {

    try {
    const validatedInput = updateTodoToolSchema.parse(input);
    const { id, ...updateData } = validatedInput;

    let response: Response;

    try {
      response = await fetch(
        `${env.TODO_API_URL}/api/v1/todos/${id}`,
        {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(updateData),
        }
      );
    } catch {
      throw new ToolError("TODO_API_UNAVAILABLE","Todo API is unavailable");
    }

    if (!response.ok) {
      if (response.status === 404) {
        throw new ToolError("TODO_NOT_FOUND", "Todo not found",404);
      }

      if (response.status === 400) {
        throw new ToolError("INVALID_TODO_DATA","Todo data is invalid", 400);
      }

      throw new ToolError("TODO_UPDATE_FAILED","Failed to update todo",response.status);
    }

    return (await response.json()) as UpdateTodoToolResponse;

  } catch (error) {
    throw normalizeToolError(error);
  }
};