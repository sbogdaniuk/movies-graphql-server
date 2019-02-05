const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')
const { ShowsAPI } = require('./api/ShowsAPI')

const port = parseInt(process.env.PORT, 10) || 4000

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
  }),
  context: () => ({

  })
})


const app = express();
server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);
