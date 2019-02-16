import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  # we can't use empty types
  type Query {
    nodeEnv: String
  }
  type Mutation {
    _empty: String @deprecated(reason: "Dummy field")
  }
  type Subscription {
    _empty: String @deprecated(reason: "Dummy field")
  }

  type User {
    id: ID!
    name: String!
    isAdmin: Boolean
    isBanned: Boolean
  }
`
