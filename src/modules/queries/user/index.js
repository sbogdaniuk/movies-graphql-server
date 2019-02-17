import { and } from 'graphql-shield'

import { shields } from '../../../utils'

export const shield = {
  Query: {
    user: and(shields.isAuthenticated, shields.isAdmin)
  }
}

export const resolvers = {
  Query: {
    user: (root, args, ctx) => ctx.dataSources.userAPI.getUserById(args.id),
  },
}
