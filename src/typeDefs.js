import { gql } from 'apollo-server'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    isAdmin: Boolean
    banned: Boolean
  }
  
  type Show {
    id: ID!
    name: String!
    type: String
    language: String
    genres: [String]!
    image: Image!
    summary: String
  }

  type Image {
    medium: String
    original: String
  }

  type Query {
    shows: [Show!]!
    show(id: ID!): Show
    user(id: ID!): User
  }
`
