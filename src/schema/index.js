import { makeExecutableSchema } from 'graphql-tools'
import { applyMiddleware } from 'graphql-middleware'
import { shield } from 'graphql-shield'
import merge from 'lodash/merge'

import { typeDefs } from './typeDefs'
import { me, show, user, users } from './queries'
import { signIn, signOut, banUser } from './mutations'
import { mutationArgsValidation } from '../middlewares'
import { genSchema } from './schema'

genSchema()

const executableSchema = makeExecutableSchema({
  // merge all schemas and resolvers from modules
  ...[
    // Query
    me,
    user,
    users,
    show,
    // Mutation
    signIn,
    signOut,
    banUser,
  ].reduce((acc, d) => ({
    typeDefs: [...acc.typeDefs, d.typeDefs],
    resolvers: [...acc.resolvers, d.resolvers],
  }), {
    typeDefs: [typeDefs],
    resolvers: [],
  }),
})


const permissions = shield(merge(
  me.shield,
  user.shield,
  users.shield,
))

export const schema = applyMiddleware(
  executableSchema,
  mutationArgsValidation,
  permissions,
)
