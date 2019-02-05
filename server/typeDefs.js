const { gql } = require('apollo-server-express')

const typeDefs = gql`
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
  }
`

module.exports = { typeDefs }
