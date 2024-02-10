import { FastifyInstance } from 'fastify'
import z from 'zod'

import { prisma } from '../../lib/prisma'

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (req, replay) => {
    const createPollBody = z.object({
      title: z.string().min(1, 'item obrigatório'),
      options: z.array(z.string()),
    })

    const { title, options } = createPollBody.parse(req.body)

    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map((option) => {
              return { title: option }
            }),
          },
        },
      },
    })

    return replay.code(201).send({ pollId: poll.id })
  })
}
