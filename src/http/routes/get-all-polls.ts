import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma'

export async function getAllPolls(app: FastifyInstance) {
  app.get('/polls', async (req, replay) => {
    const polls = await prisma.poll.findMany({
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return replay.code(200).send(polls)
  })
}
