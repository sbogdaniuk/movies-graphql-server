import { ApolloServer } from 'apollo-server'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { ShowsAPI, UserAPI } from './api'

const port = parseInt(process.env.PORT, 10) || 4000

const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))

const getUser = async (req, ms) => {
  // Here you will fetch user
  await sleep(ms)
  return { id: 'user-id' }
}

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: process.env.ENGINE_API_KEY && {
    apiKey: process.env.ENGINE_API_KEY,
  },
  dataSources: () => ({
    showsAPI: new ShowsAPI(),
    userAPI: new UserAPI(),
  }),
  context: async ({ req, res }) => ({
    user: getUser(req, 10),
    req,
    res,
  }),
})

server
  .listen({ port })
  .then(() =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
  )
