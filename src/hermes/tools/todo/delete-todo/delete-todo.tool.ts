import { env } from "../../../../core/config/env.js";
import { deleteTodoToolSchema } from "./delete-todo.validation.js";
import type {DeleteTodoToolInput,DeleteTodoToolResponse,} from "./delete-todo.types.js";
import { normalizeToolError } from "../../../errors/normalize-tool-error.js";
import { ToolError } from "../../../errors/tools-error.js";

export const deleteTodoTool = async (input: DeleteTodoToolInput
): Promise<DeleteTodoToolResponse> => {
  
  try {
    const validatedInput =
      deleteTodoToolSchema.parse(input);

    let response: Response;

    try {
      response = await fetch(`${env.TODO_API_URL}/api/v1/todos/${validatedInput.id}`,
        {
          method: "DELETE",
        }
      );
    } catch {
      throw new ToolError("TODO_API_UNAVAILABLE","Todo API is unavailable");
    }

    if (!response.ok) {
      if (response.status === 404) {
        throw new ToolError("TODO_NOT_FOUND","Todo not found",404);
      }

      throw new ToolError("TODO_DELETE_FAILED","Failed to delete todo", response.status);
    }

    return (await response.json()) as DeleteTodoToolResponse;

  } catch (error) {
    throw normalizeToolError(error);
  }
};