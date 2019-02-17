import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import * as path from 'path'
import * as fs from 'fs'
import { makeExecutableSchema } from 'graphql-tools'
import * as glob from 'glob'
import { shield } from 'graphql-shield'
import merge from 'lodash/merge'
import { applyMiddleware } from 'graphql-middleware'

import { mutationArgsValidation } from './middlewares'

const genSchema = () => {
  const pathToModules = path.join(__dirname, './modules')
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: 'utf8' }))

  const { resolvers, shields } = glob
    .sync(`${pathToModules}/**/*.?s`)
    .reduce((acc, resolver) => {
      const { resolvers, shield } = require(resolver)
      return {
        resolvers: resolvers ? [...acc.resolvers, resolvers] : acc.resolvers,
        shields: shield ? [...acc.shields, shield] : acc.shields,
      }
    }, {
      resolvers: [],
      shields: [],
    })

  const schema = makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers),
  })

  const permissions = shield(merge(...shields))

  return applyMiddleware(
    schema,
    mutationArgsValidation,
    permissions,
  )
}

export const schema = genSchema()
