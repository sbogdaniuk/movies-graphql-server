import http from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'

import { schema } from './schema'
import { formatError, jwtCheck } from './middlewares'
import { ShowsAPI, UserAPI } from './api'
import { SECRET, SECRET2 } from './config'

const port = parseInt(process.env.PORT, 10) || 4000

const app = express()

app.use(cookieParser())
app.use(jwtCheck({ SECRET, SECRET2, userAPI: new UserAPI() }))

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
  context: ({ req, res, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    }

    return {
      req,
      res,
      SECRET,
      SECRET2,
      user: req.user,
    }
  },
  subscriptions: {
    path: '/'
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

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
})
