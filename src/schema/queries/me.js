import { gql } from 'apollo-server-express'

import { AuthenticationError } from '../errors'
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
      if (user) {
        const res = await dataSources.userAPI.getUser({ id: user.id })
        if (res) return res
      }

      res.clearCookie('token')
      res.clearCookie('refresh-token')

      throw new AuthenticationError()
    },
  },
}

export const me = { typeDefs, resolvers, shield }
