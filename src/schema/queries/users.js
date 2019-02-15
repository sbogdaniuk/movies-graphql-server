import { and } from 'graphql-shield'
import { gql } from 'apollo-server-express'

import { isAdmin, isAuthenticated } from '../rules'

const shield = {
  Query: {
    users: and(isAuthenticated, isAdmin)
  }
}

const typeDefs = gql`
  extend type Query {
    users(ids: [ID!]): [User!]!
  }
`

const resolvers = {
  Query: {
    users: (root, { ids }, ctx) => {
      if (ids) {
        return ctx.dataSources.userAPI.getUsersByIds(ids)
      }

      return ctx.dataSources.userAPI.getUsers()
    },
  },
}

export const users = { typeDefs, resolvers, shield }
