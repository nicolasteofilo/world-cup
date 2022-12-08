import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

import ShortUniqueId from "short-unique-id";
import { authenticatePlugin } from "../plugins/authenticate";

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
      await request.jwtVerify();
      try {
        await prisma.pool.create({
          data: {
            title,
            code,
            ownerId: request.user.sub,

            participants: {
              create: {
                userId: request.user.sub,  
              }
            }
          },
        });
        return reply.status(201).send({ statusCode: 201, code });
      } catch (error) {
          return reply
            .status(500)
            .send({ statusCode: 500, error: "Internal server error" });
      }     
    } catch {
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
    }
  });

  fastify.post('/pools/join', {
    onRequest: [authenticatePlugin],
  }, async (request, reply) => {
    const { code }: any = request.body;

    if (!code) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Missing param: code",
      });
    }
  
    const pool = await prisma.pool.findUnique({
      where: {
        code,
      },
      include: {
        participants: {
          where: {
            userId: request.user.sub,
          }
        }
      }
    })

    if(!pool) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Poll not found",
      });
    }

    if(pool.participants.length > 0) {
      return reply.status(400).send({
        statusCode: 400,
        error: "You already joined this poll",
      });
    }

    if(!pool.ownerId) {
      await prisma.pool.update({
        where: {
          id: pool.id,
        },
        data: {
          ownerId: request.user.sub
        }
      })
    }

    await prisma.participant.create({
      data: {
        poolId: pool.id,
        userId: request.user.sub,
      }
    })

    return reply.status(204).send();
  })

  fastify.get('/pools', {
    onRequest: [authenticatePlugin]
  }, async (request, reply) => {
    try {
      const pools = await prisma.pool.findMany({
        where: {
          participants: {
            some: {
              userId: request.user.sub
            }
          }
        },
        include: {
          _count: {
            select: {
              participants: true,
            }
          },
          participants: {
            select: {
              id: true,
              user: {
                select: {
                  avatarUrl: true,
                }
              }
            },
            take: 4,
          },
          owner: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })

      return reply.status(200).send({
        statusCode: 200,
        pools,
      })
    } catch (error) {
        return reply
          .status(500)
          .send({ statusCode: 500, error: "Internal server error" });
    }
  })

  fastify.get('/pools/:id', {
    onRequest: [authenticatePlugin]
  }, async (request, reply) => {
    const { id }: any = request.params;

    if (!id) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Missing param: id",
      });
    }
    
    try {
      const pool = await prisma.pool.findUnique({
        where: {
          id,
        },
        include: {
          _count: {
            select: {
              participants: true,
            }
          },
          participants: {
            select: {
              id: true,

              user: {
                select: {
                  avatarUrl: true,
                }
              }
            },
            take: 4,
          },
          owner: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      })

      console.log({pool})

      return reply.status(200).send({
        statusCode: 200,
        pool,
      })
    } catch (error) {
      return reply
        .status(500)
        .send({statusCode: 500, error: "Internal server error"});
    }
  })
}
