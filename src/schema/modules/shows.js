import { gql } from 'apollo-server-express'
import { NotFound } from '../errors'

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

  extend type Query {
    show(id: ID!): Show
  }
`

const resolvers = {
  Query: {
    show: async (root, args, ctx) => {
      try {
        return await ctx.dataSources.showsAPI.getShow(args.id)
      } catch ({ message, extensions }) {
        throw new NotFound({ message, internalData: extensions })
      }
    },
  },
}

export const shows = { typeDefs, resolvers }
