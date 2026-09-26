import { z } from "zod";

export const deleteTodoToolSchema = z.object({
  id: z.string().min(1, "Todo ID is required"),
});