import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@email.com",
      avatarUrl: "https://xsgames.co/randomusers/assets/avatars/pixel/36.jpg",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "POOL12",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-12-01T16:00:00.201Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-12-02T16:00:00.201Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "BR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 2,

          parcipant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          },
        }
      }
    },
  });
}

main();
