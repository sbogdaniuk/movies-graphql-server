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

const me1 = (root, args, { req, res, ...ctx }, info) => {
  console.log(111, 'me1', { root, args, ctx }, info)
  skip()
}

const me2 = (root, args, { req, res, ...ctx }) => {
  console.log(222, 'me2', { root, args, ctx })
  skip()
}

const me3 = (root, args, { req, res, ...ctx }) => {
  console.log(222, 'me3', { root, args, ctx })
  return 'me3'
}

const resolvers = {
  Query: {
    me: baseResolver.createResolver(async (obj, args, ctx, info) => {
      const res = await ctx.dataSources.userAPI.getUser(1)
      return res || null
    }),
    me3: combineResolvers(me1, me2, me3)
  },
  Mutation: {
    login,
  },
}

export const auth = { typeDefs, resolvers }
