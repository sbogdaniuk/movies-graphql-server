import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  # we can't use empty types
  type Query {
    _empty: String @deprecated(reason: "Dummy field")
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
