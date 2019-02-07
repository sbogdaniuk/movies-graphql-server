import { gql } from 'apollo-server-express'
import { skip, combineResolvers } from 'graphql-resolvers'

import { baseResolver } from '../../resolvers'

import { login } from './login'

const typeDefs = gql`
  extend type Query {
    me: User
    me3: String
  }

  extend type Mutation {
    login(input: LoginInput!): LoginPayload!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginPayload {
    token: String
    refreshToken: String
  }
`

const resolvers = {
  Query: {
    me: baseResolver.createResolver(async (obj, args, ctx, info) => {
      const res = await ctx.dataSources.userAPI.getUser(1)
      return res || null
    }),
  },
  Mutation: {
    login,
  },
}

export const auth = { typeDefs, resolvers }
