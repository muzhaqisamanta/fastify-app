const {build} = require('./app')

const app = build(
  {logger:true},
  {
    exposeRoute:true,
    routePrefix:"/docs",
    swagger: {info: { title: "Fastify Swagger API", version: "1.0.1"}},
  }
  );

  app.listen(5000, function(err, address){
    if (err) {
        app.log.console.error(err);
        process.exit(1);
    }
  })