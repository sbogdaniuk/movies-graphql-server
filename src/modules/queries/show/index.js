import { errors } from '../../../constants'

export const resolvers = {
  Query: {
    show: async (root, args, ctx) => {
      try {
        return await ctx.dataSources.showsAPI.getShow(args.id)
      } catch ({ message, extensions }) {
        throw new errors.NotFound({ message, internalData: extensions })
      }
    },
  },
}
