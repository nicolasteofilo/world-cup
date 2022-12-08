import { FastifyInstance } from "fastify";
import {prisma} from "../lib/prisma";
import { authenticatePlugin } from "../plugins/authenticate";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/:id/games', {
    onRequest: [authenticatePlugin]
  }, async (request, reply) => {
    const { id }: any = request.params;

    if (!id) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Missing param: id",
      });
    }

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc'
      },
      include: {
        guesses: {
          where: {
            parcipant: {
              userId: request.user.sub,
              poolId: id
            }
          }
        }
      }
    })

    return reply.status(200).send({
      statusbar: 200,
      games: games.map(game => {
        return {
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined
        }
      }),
    })
  })
}
