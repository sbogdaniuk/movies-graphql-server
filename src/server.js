require('dotenv').config()
import { Server as HttpServer } from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import jsonServer from 'json-server'
import { ApolloServer } from 'apollo-server-express'
import { ApolloEngine } from 'apollo-engine'

import { schema } from './schema'
import { psEvents, pubsub } from './pubsub'
import { formatError, jwtCheck } from './middlewares'
import { ShowsAPI, UserAPI } from './dataSources'
import { SECRET, SECRET2 } from './config'
import { genDB } from './json-server'

const startServer = async () => {
  const DB = await genDB()
  const port = parseInt(process.env.PORT, 10) || 4000
  const app = express()

  app.use(cookieParser())
  app.use('/api', jsonServer.defaults(), jsonServer.router(DB))
  app.use(jwtCheck({ SECRET, SECRET2 }))

  const dataSources = () => ({
    showsAPI: new ShowsAPI(),
    userAPI: new UserAPI(),
  })
  const context = async ({ req, res, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context
    }

    return {
      req,
      res,
      SECRET,
      SECRET2,
      pubsub,
      psEvents,
      user: req.user,
    }
  }

  const server = new ApolloServer({
    schema,
    formatError,
    dataSources,
    context,
    tracing: true,
    cacheControl: true,
    playground: true,
    introspection: true,
    engine: false,
    subscriptions: {
      path: '/',
    },
  })

  server.applyMiddleware({
    app,
    path: '/',
  })

  const httpServer = new HttpServer(app)
  server.installSubscriptionHandlers(httpServer)

  // Initialize Apollo Engine.
  const engine = new ApolloEngine({
    apiKey: process.env.ENGINE_API_KEY,
  })

  // Start Apollo Engine.
  engine.listen({
    port,
    httpServer,
  }, () => {
    console.log(`🚀 Server         –– http://localhost:${port}${server.graphqlPath}`)
    console.log(`👻 Subscriptions  –– ws://localhost:${port}${server.subscriptionsPath}`)
    console.log(`🗒  REST           –– http://localhost:${port}/api`)
  })

  // httpServer.listen(port, () => {
  //   console.log(`🚀 Server         –– http://localhost:${port}${server.graphqlPath}`)
  //   console.log(`👻 Subscriptions  –– ws://localhost:${port}${server.subscriptionsPath}`)
  //   console.log(`🗒  REST           –– http://localhost:${port}/api`)
  // })
}

startServer()
