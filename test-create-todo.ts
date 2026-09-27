import { createTodoTool } from "./src/hermes/tools/todo/create-todo/create-todo.tool.js";

try {
  const result = await createTodoTool({
    title: "",
    description: "Test createTodo tool",
  });

  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error("Tool Error:", error);
}