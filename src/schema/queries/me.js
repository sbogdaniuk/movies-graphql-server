import { gql } from 'apollo-server-express'

import { isAuthenticated } from '../rules'

const shield = {
  Query: {
    me: isAuthenticated
  }
}

const typeDefs = gql`
  extend type Query {
    me: User
  }
`

const resolvers = {
  Query: {
    me: async (obj, args, { dataSources, user, res }, info) => {
      return await dataSources.userAPI.getUser({ id: user.id })
    },
  },
}

export const me = { typeDefs, resolvers, shield }
