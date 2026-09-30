import { listTodosTool } from "./src/hermes/tools/todo/list-todos/list-todos.tools";

const result = await listTodosTool({
  page: 1,
  limit: 2,
});

console.log(JSON.stringify(result, null, 2));