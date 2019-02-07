import { gql } from 'apollo-server-express'

import { login } from './login'
import { me } from './me'

const typeDefs = gql`
  extend type Query {
    me: User
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
    me,
  },
  Mutation: {
    login,
  },
}

export const auth = { typeDefs, resolvers }
