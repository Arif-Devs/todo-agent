import express from "express";
import todoRoutes from "./modules/todo/routes/todo.route.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Todo Agent API is running",
  });
});

app.use("/api/v1/todos", todoRoutes);
app.use(errorHandler);

export default app;
