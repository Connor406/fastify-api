const fastify = require("fastify")({ logger: true });

// Register Swagger => see docs for all options
// Must be above Routes register
fastify.register(require("fastify-swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: { title: "fastify-api" },
  },
});

fastify.register(require("./routes/items")); // Register routes

const PORT = 5000;

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
