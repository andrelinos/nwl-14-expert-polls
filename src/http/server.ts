import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'
import fastify from 'fastify'

import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import { pollResults } from './ws/poll-results'

const app = fastify()

app.register(cookie, {
  secret: 'ab264f92-1f19-4ee5-885d-ebe333272ccc',
  hook: 'onRequest',
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.register(pollResults)

const port = 3333

app.listen({ port }).then(() => {
  console.log(`🚀 HTTP is running on port ${port} 🔥`)
})
