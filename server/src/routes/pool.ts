import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

import ShortUniqueId from "short-unique-id";

export async function poolRoutes(fastify: FastifyInstance) {
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
}
