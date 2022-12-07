import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/users/count", async (_, reply) => {
    try {
      const count = await prisma.user.count();
      return reply.status(200).send({ statusCode: 200, count });
    } catch (error) {
      return reply
        .status(500)
        .send({ statusCode: 500, error: "Internal server error" });
    }
  });
}
