import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
  return 'Hello world!'
})

const PORT = 3333

app.listen({ port: PORT }).then(() => {
  console.log(`🚀 HTTP is running on port ${PORT} 🔥`)
})
