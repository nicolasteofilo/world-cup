import Fastify from "fastify";
import cors from "@fastify/cors";

import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.register(poolRoutes)
  fastify.register(userRoutes)
  fastify.register(guessRoutes)

  await fastify.listen({ port: 3333 });
}

start();
