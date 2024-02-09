import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import z from 'zod'

const app = fastify()

const prisma = new PrismaClient()

app.get('/polls', () => {
  return 'Hello world!'
})

app.post('/polls', async (req, res) => {
  const createPollBody = z.object({
    title: z.string().min(1, 'item obrigatório'),
  })

  const { title } = createPollBody.parse(req.body)

  const poll = await prisma.poll.create({
    data: {
      title,
    },
  })

  return poll
})

const PORT = 3333

app.listen({ port: PORT }).then(() => {
  console.log(`🚀 HTTP is running on port ${PORT} 🔥`)
})
