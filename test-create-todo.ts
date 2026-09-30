import { createTodoTool } from "./src/hermes/tools/todo/create-todo/create-todo.tool.js";

const result = await createTodoTool({
  title: "Learn Hermes Integration",
  description: "Test Hermes Todo API integration",
});

console.log(JSON.stringify(result, null, 2));