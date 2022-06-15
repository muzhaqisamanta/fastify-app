const Todo = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    todo: {
      type: "string",
    },
    message: {
      type: "string",
    },
  },
};

const getTodosOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        todos: Todo,
      },
    },
  },
};

const getTodoOpts = {
  schema: {
    response: {
      200: Todo,
    },
  },
};

const postTodoOpts = {
  schema: {
    body: {
      type: "object",
      required: ["todo", "message"],
      properties: {
        todo: { type: "string" },
        message: { type: "string" },
      },
    },
    response: {
      201: Todo,
    },
  },
};
const updateTodoOpts = {
  schema: {
    body: {
      type: "object",
      required: ["todo", "message"],
      properties: {
        todo: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
    response: {
      200: Todo,
    },
  },
};

const deleteTodoOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

module.exports = {
  getTodoOpts,
  getTodosOpts,
  postTodoOpts,
  updateTodoOpts,
  deleteTodoOpts,
};
