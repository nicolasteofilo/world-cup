import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { authRoutes } from "./routes/auth";

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: 'as978a897a9s7a8s-hdgsa7dgs-sgdas7ds6ga',
  });

  fastify.register(poolRoutes)
  fastify.register(userRoutes)
  fastify.register(guessRoutes)
  fastify.register(authRoutes)

  await fastify.listen({ port: 3333 });
}

start();
