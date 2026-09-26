import {z} from "zod";

export const listTodosToolSchema = z.object({
  page: z.number().int().positive().optional(),

  limit: z
    .number()
    .int()
    .positive()
    .max(100)
    .optional(),
});