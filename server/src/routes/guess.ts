import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { authenticatePlugin } from "../plugins/authenticate";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get("/guesses/count", async (_, reply) => {
    try {
      const count = await prisma.guess.count();
      return reply.status(200).send({ statusCode: 200, count });
    } catch (error) {
      return reply
        .status(500)
        .send({ statusCode: 500, error: "Internal server error" });
    }
  })

  fastify.post("/pools/:poolId/games/:gameId/guesses", {
    onRequest: [authenticatePlugin]
  }, async (request, reply) => {
    const { firstTeamPoints, secondTeamPoints }: any = request.body;
    const { poolId, gameId }: any = request.params;

    if (!firstTeamPoints || !secondTeamPoints) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Missing param: firstTeamPoints or secondTeamPoints",
      });
    }

    const parcipant = await prisma.participant.findUnique({
      where: {
        userId_poolId: {
          poolId,
          userId: request.user.sub
        }
      }
    })

    if (!parcipant) {
      return reply.status(400).send({
        statusCode: 400,
        error: "You are not allowed to create a guess inside this poll",
      });
    }

    const guess = await prisma.guess.findUnique({
      where: {
        participantId_gameId: {
          participantId: parcipant.id,
          gameId,
        }
      }
    }) 

    if (guess) {
      return reply.status(400).send({
        statusCode: 400,
        error: "You already sent a guess to this poll on this poll",
      });
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId
      }
    })

    if (!game) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Game not found",
      });
    }

    if(game.date < new Date()) {
      return reply.status(400).send({
        statusCode: 400,
        error: "You cannot send guesses after the game ended",
      });
    }

    await prisma.guess.create({
      data: {
        firstTeamPoints,
        secondTeamPoints,
        gameId: game.id,
        participantId: parcipant.id
      }
    })

    return reply.status(201).send();
  })
} 
