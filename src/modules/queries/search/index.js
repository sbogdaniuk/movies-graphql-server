export const resolvers = {
  Query: {
    search: async (root, { search }, ctx) => {
      return await ctx.dataSources.showsAPI.search({ name_like: search })
    },
  },
}
