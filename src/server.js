import http from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import jsonServer from 'json-server'
import { ApolloServer } from 'apollo-server-express'

import { schema } from './schema'
import { formatError, jwtCheck } from './middlewares'
import { ShowsAPI, UserAPI } from './api'
import { SECRET, SECRET2 } from './config'

import { genDB } from './json-server'

const startServer = async () => {
  const port = parseInt(process.env.PORT, 10) || 4000
  const app = express()

  app.use(cookieParser())
  app.use('/api', jsonServer.defaults(), jsonServer.router(await genDB()))
  app.use(jwtCheck({ SECRET, SECRET2 }))

  const server = new ApolloServer({
    schema,
    engine: process.env.ENGINE_API_KEY && {
      apiKey: process.env.ENGINE_API_KEY,
    },
    formatError,
    dataSources: () => ({
      showsAPI: new ShowsAPI(),
      userAPI: new UserAPI(),
    }),
    context: async ({ req, res, connection }) => {
      if (connection) {
        // check connection for metadata
        return connection.context
      }

      return {
        req,
        res,
        SECRET,
        SECRET2,
        user: req.user,
      }
    },
    playground: true,
    introspection: true,
    subscriptions: {
      path: '/',
      // onConnect: (connectionParams, webSocket, context) => {
      //   console.log(111, 'onConnect')
      // },
      // onDisconnect: (webSocket, context) => {
      //   console.log(222, 'onDisconnect')
      // },
    },
  })

  server.applyMiddleware({
    app,
    path: '/',
  })

  const httpServer = http.createServer(app)
  server.installSubscriptionHandlers(httpServer)

  httpServer.listen(port, () => {
    console.log(`🚀 Server         –– http://localhost:${port}${server.graphqlPath}`)
    console.log(`👻 Subscriptions  –– ws://localhost:${port}${server.subscriptionsPath}`)
    console.log(`🗒  REST           –– http://localhost:${port}/api`)
  })
}

startServer()
