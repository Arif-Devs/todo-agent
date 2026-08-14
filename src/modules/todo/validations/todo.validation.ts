import { positive, z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});


export const updateTodoSchema = z.object({
    title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .optional(),

    description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

    completed: z
    .boolean()
    .optional(),
  }).refine((data) => Object.keys(data).length > 0,
      {
      message: "At least one field is required",
      }
  );

  export const paginationSchema = z.object({
    page: z.coerce
      .number()
      .int()
      .positive()
      .default(1),

    limit: z. coerce
      .number()
      .int()
      .positive()
      .max(100)
      .default(10)
  })

  export type PaginationDto = z.infer<typeof paginationSchema>





export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
export type CreateTodoDto = z.infer<typeof createTodoSchema>;
