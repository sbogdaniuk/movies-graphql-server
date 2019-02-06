import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'

import { schema } from './schema'
import { ShowsAPI, UserAPI } from './api'
import { SECRET, SECRET2 } from './config'
import { formatError, jwtCheck } from './utils'

const port = parseInt(process.env.PORT, 10) || 4000


const dataSources = () => ({
  showsAPI: new ShowsAPI(),
  userAPI: new UserAPI(),
})

const app = express()

app.use(cookieParser())
app.use(jwtCheck({ SECRET, SECRET2, dataSources: dataSources() }))

const server = new ApolloServer({
  schema,
  engine: process.env.ENGINE_API_KEY && {
    apiKey: process.env.ENGINE_API_KEY,
  },
  formatError,
  dataSources,
  context: ({ req, res }) => ({
    req,
    res,
    SECRET,
    SECRET2,
  }),
})

server.applyMiddleware({
  app,
  path: '/',
})

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
)
