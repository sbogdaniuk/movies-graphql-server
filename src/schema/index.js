import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { applyMiddleware } from 'graphql-middleware'
import { shield } from 'graphql-shield'
import merge from 'lodash/merge'

import { me, show, user } from './queries'
import { signIn, signOut } from './mutations'
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
    // Query
    me,
    user,
    show,
    // Mutation
    signIn,
    signOut,
  ].reduce((acc, d) => ({
    typeDefs: [...acc.typeDefs, d.typeDefs],
    resolvers: [...acc.resolvers, d.resolvers],
  }), {
    typeDefs: [rootTypeDefs],
    resolvers: [],
  }),
})


const permissions = shield(merge(
  me.shield,
))

export const schema = applyMiddleware(
  executableSchema,
  mutationArgsValidation,
  permissions,
)
