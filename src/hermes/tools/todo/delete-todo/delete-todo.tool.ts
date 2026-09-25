import { env } from "../../../../core/config/env.js";

import type {DeleteTodoToolInput,DeleteTodoToolResponse,} from "./delete-todo.types.js";

export const deleteTodoTool = async (input: DeleteTodoToolInput
): Promise<DeleteTodoToolResponse> => {
  
    const response = await fetch(
    `${env.TODO_API_URL}/api/v1/todos/${input.id}`,
    {
      method: "DELETE",
    }
  );

  const result =
    (await response.json()) as DeleteTodoToolResponse;

  return result;
};