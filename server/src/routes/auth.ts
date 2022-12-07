import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import fetch from "node-fetch";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (request, reply) => {
    const { access_token }: any = request.body;
    
    if (!access_token) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Missing param: access_token",
      });
    }

    try {
      const googleAPI = "https://www.googleapis.com/oauth2/v2/userinfo";
      const userResponse = await fetch(googleAPI, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      console.log({ userResponse })

      const { id, email, name, picture }: any = await userResponse.json();
      const userInfo = {
        id,
        email,
        name,
        picture,
      };

      console.log(userInfo);

      let user = await prisma.user.findUnique({
        where: {
          googleId: id
        } 
      })

      if(!user) {
        user = await prisma.user.create({
          data: {
            googleId: id,
            email,
            name,
            avatarUrl: picture
          }
        })
      }

      const token = fastify.jwt.sign({
        name: user.name,
        avatarUrl: user.avatarUrl
      }, {
        sub: user.id,
        expiresIn: '7 days'
      })

      return reply.status(200).send({ statusCode: 201, user, token });
    } catch (error) {
      console.error(error)
      return reply
        .status(500)
        .send({ statusCode: 500, error: "Internal server error" });
    }
  })
}
