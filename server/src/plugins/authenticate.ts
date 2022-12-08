import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticatePlugin(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify();
}
