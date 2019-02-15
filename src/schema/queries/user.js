import { gql } from 'apollo-server-express'
import { and } from 'graphql-shield'
import { isAdmin, isAuthenticated } from '../rules'

const shield = {
  Query: {
    user: and(isAuthenticated, isAdmin)
  }
}

const typeDefs = gql`
  extend type Query {
    user(id: ID!): User
  }
`

const resolvers = {
  Query: {
    user: (root, args, ctx) => ctx.dataSources.userAPI.getUserById(args.id),
  },
}

export const user = { typeDefs, resolvers, shield }
