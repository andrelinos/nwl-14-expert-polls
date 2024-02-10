import { randomUUID } from 'node:crypto'

import { FastifyInstance } from 'fastify'
import z from 'zod'


export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (req, replay) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    })

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = voteOnPollParams.parse(req.params)
    const { pollOptionId } = voteOnPollBody.parse(req.body)

    const sessionId = randomUUID()

    replay.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      signed: true,
      httpOnly: true,
    })

    return replay.code(201).send()
  })
}
