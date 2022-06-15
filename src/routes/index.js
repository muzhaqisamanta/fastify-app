const {getTodoOpts, 
  getTodosOpts, 
  postTodoOpts,
  deleteTodoOpts,
  updateTodoOpts 
} = require("./todo/options")
let todos = require("../todoArray");

const itemRoute = (fastify, options, done) => {

  fastify.get("/", getTodosOpts, function (request, reply) {
    reply.send(todos);
  });

  fastify.get("/:id", getTodoOpts, function (request, reply) {
    const { id } = request.params;
    const todo = todos.find((todo) => todo.id === id);
    reply.send(todo);
  });

  fastify.post("/", postTodoOpts, function (request, reply) {
    const { todo, message } = request.body;
    const Todo = { id: String, todo, message };
    todos.push(Todo);
    reply.code(201).send(Todo);
  });

  fastify.delete("/:id",deleteTodoOpts,  function (request, reply) {
    const { id } = request.params;
    todos = todos.filter((todo) => todo.id !== id);
    reply.send(`Todo with id ${id} has been deleted`);
  });
  done();

  fastify.put("/:id", updateTodoOpts, function (request, reply) {
    const { id } = request.params;
    const { todo, message } = request.body;
    const newTodo = todos.find((todo) => todo.id === id);

    newTodo.todo = todo;
    newTodo.message = message;

    reply.send(newTodo);
  });
};
module.exports = { itemRoute };
