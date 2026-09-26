import {z} from "zod";

export const getTodoToolSchema = z.object({
  id: z.string().min(1),
});