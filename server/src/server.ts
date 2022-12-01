import Fastify from "fastify";
import cors from "@fastify/cors";

import ShortUniqueId from "short-unique-id";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async (_, reply) => {
    try {
      const count = await prisma.pool.count();
      return reply.status(200).send({ statusCode: 200, count });
    } catch (error) {
      return reply
        .status(500)
        .send({ statusCode: 500, error: "Internal server error" });
    }
  });

  fastify.post("/pools", async (request, reply) => {
    const { title }: any = request.body;

    if (!title) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Missing param: title",
      });
    }

    const generateId = new ShortUniqueId({ length: 6 });
    const code = String(generateId()).toUpperCase();
    try {
      await prisma.pool.create({
        data: {
          title,
          code,
        },
      });
      return reply.status(201).send({ statusCode: 201, code });
    } catch (error) {
      return reply
        .status(500)
        .send({ statusCode: 500, error: "Internal server error" });
    }
  });

  await fastify.listen({ port: 3333 });
}

start();
