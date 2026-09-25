import { env } from "../../../../core/config/env.js";
import type {UpdateTodoToolInput, UpdateTodoToolResponse} from "./update-todo.types.js";

export const updateTodoTool = async (
  input: UpdateTodoToolInput
): Promise<UpdateTodoToolResponse> => {
  const { id, ...updateData } = input;

  const response = await fetch(`${env.TODO_API_URL}/api/v1/todos/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }
  );

  const result = (await response.json()) as UpdateTodoToolResponse;

  return result;
};