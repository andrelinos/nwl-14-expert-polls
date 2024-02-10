import { FastifyInstance } from 'fastify'
import z from 'zod'

import { prisma } from '../../lib/prisma'

export async function deletePoll(app: FastifyInstance) {
  app.delete('/polls/:pollId', async (req, replay) => {
    const deletePollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = deletePollParams.parse(req.params)

    await prisma.poll.delete({
      where: { id: pollId },
    })

    return replay.code(204).send()
  })
}
