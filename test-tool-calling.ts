import { env } from "./src/core/config/env.js";
import { createTodoToolDefinition } from "./src/hermes/tools/todo/tool-definitions.js";

const response = await fetch(`${env.OLLAMA_BASE_URL}/api/chat`, {
  method: "POST",

  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    model: env.OLLAMA_MODEL,

    messages: [
      {
        role: "user",
        content: "Create a todo called Learn Docker",
      },
    ],

    tools: [
      createTodoToolDefinition,
    ],

    stream: false,
  }),
});

const result = await response.json();

console.log(JSON.stringify(result, null, 2));