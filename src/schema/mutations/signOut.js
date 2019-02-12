import { gql } from 'apollo-server-express'

const typeDefs = gql`
  extend type Mutation {
    signOut: SignOutPayload!
  }

  type SignOutPayload {
    status: Int!
  }
`

const resolvers = {
  Mutation: {
    signOut: async (parent, args, { res }) => {
      res.clearCookie('token')
      res.clearCookie('refresh-token')
      return { status: 200 }
    },
  },
}

export const signOut = { typeDefs, resolvers }
