import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticatePlugin(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
      return reply
        .status(401)
        .send({ statusCode: 401, error: "Invalid param: token" });  }
}
