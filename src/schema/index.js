import { gql } from 'apollo-server-express'
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools'
import { applyMiddleware } from 'graphql-middleware'

import { auth, shows, users } from './modules'
import { mutationArgsValidation } from '../middlewares'

// we can't use empty types
const rootTypeDefs = gql`
  type Query {
    _empty: String @deprecated(reason: "Dummy field")
  }
  type Mutation {
    _empty: String @deprecated(reason: "Dummy field")
  }
`

const executableSchema = makeExecutableSchema({
  // merge all schemas and resolvers from modules
  ...[
    users,
    shows,
    auth,
  ].reduce((acc, d) => ({
    typeDefs: [...acc.typeDefs, d.typeDefs],
    resolvers: [...acc.resolvers, d.resolvers],
  }), {
    typeDefs: [rootTypeDefs],
    resolvers: [],
  }),
})

// mock _empty field
// addMockFunctionsToSchema({
//   schema: executableSchema,
//   preserveResolvers: true,
// })

export const schema = applyMiddleware(
  executableSchema,
  mutationArgsValidation,
)
