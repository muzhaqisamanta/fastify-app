const fastify = require('fastify')
const {itemRoute} = require('./routes')
const fastifySwagger = require('@fastify/swagger')

const build = (opts={}, optsSwagger ={})=>{ 
    const app = fastify(opts)
    app.register(fastifySwagger, optsSwagger)
    app.register(itemRoute)
    return app;
}
module.exports = {build}
