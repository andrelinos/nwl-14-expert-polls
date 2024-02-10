import { FastifyInstance } from 'fastify'
import z from 'zod'

import { prisma } from '../../lib/prisma'

export async function editPoll(app: FastifyInstance) {
  app.put('/polls/:pollId', async (req, replay) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const editPollBody = z.object({
      title: z.string().min(1, 'item obrigatório'),
      options: z.array(z.string()),
    })

    const { pollId } = getPollParams.parse(req.params)

    const { title, options } = editPollBody.parse(req.body)

    const poll = await prisma.poll.update({
      where: { id: pollId },
      data: {
        title,
        options: {
          deleteMany: {},
          createMany: {
            data: options.map((option) => {
              return { title: option }
            }),
          },
        },
      },
    })

    return replay.code(200).send()
  })
}
