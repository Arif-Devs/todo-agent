export const createTodoToolDefinition = {
  type: "function",

  function: {
    name: "createTodo",

    description: "Create a new todo",

    parameters: {
      type: "object",

      properties: {
        title: {
          type: "string",
          description: "The title of the todo",
        },

        description: {
          type: "string",
          description: "Optional description of the todo",
        },
      },

      required: ["title"],
    },
  },
};