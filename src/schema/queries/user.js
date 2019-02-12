import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    isAdmin: Boolean
    isBanned: Boolean
  }

  extend type Query {
    user(id: ID!): User
  }
`

const resolvers = {
  Query: {
    user: (root, args, ctx) => ctx.dataSources.userAPI.getUser(args.id),
  },
}

export const user = { typeDefs, resolvers }