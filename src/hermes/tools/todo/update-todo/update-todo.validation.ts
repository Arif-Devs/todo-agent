import {z} from "zod";

export const updateTodoToolSchema = z.object({
  id: z.string().min(1, "todo id required!"),
  title: z.string().min(1, "title is required").optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});