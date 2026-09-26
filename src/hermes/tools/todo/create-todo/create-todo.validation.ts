import {z} from "zod";

export const createTodoToolSchema = z.object({
    title: z.string().min(1, "title is required"),
    description:z.string().optional()
})