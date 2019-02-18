import { and } from 'graphql-shield'
import filter from 'lodash/filter'

import { shields } from '../../../utils'

// export const shield = {
//   Query: {
//     users: and(shields.isAuthenticated, shields.isAdmin)
//   }
// }

export const resolvers = {
  Query: {
    users: async (root, { ids, excludeIds }, ctx) => {
      const users = await (async (ids) => {
        if (ids) {
          return await ctx.dataSources.userAPI.getUsersByIds(ids)
        }

        return await ctx.dataSources.userAPI.getUsers()
      })(ids)

      if (excludeIds) {
        return filter(users, (d) => !excludeIds.includes(d.id))
      }

      return users
    },
  },
}
