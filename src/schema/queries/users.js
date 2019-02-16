import { and } from 'graphql-shield'
import { gql } from 'apollo-server-express'
import filter from 'lodash/filter'

import { isAdmin, isAuthenticated } from '../rules'

const shield = {
  Query: {
    users: and(isAuthenticated, isAdmin)
  }
}

const typeDefs = gql`
  extend type Query {
    users(ids: [ID!], excludeIds: [ID!]): [User!]!
  }
`

const resolvers = {
  Query: {
    users: async (root, { ids, excludeIds }, ctx) => {
      const users = await (async (ids) => {
        if (ids) {
          return await ctx.dataSources.userAPI.getUsersByIds(ids)
        }

        return await ctx.dataSources.userAPI.getUsers()
      })(ids)

      if (excludeIds) {
        return filter(users, (d) => !excludeIds.includes(d.id))
      }

      return users
    },
  },
}

export const users = { typeDefs, resolvers, shield }
