import { shields } from '../../../utils'

export const shield = {
  Query: {
    me: shields.isAuthenticated
  }
}

export const resolvers = {
  Query: {
    me: async (obj, args, { dataSources, user, res }, info) => {
      return await dataSources.userAPI.getUser({ id: user.id })
    },
  },
}
