// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    shows: (root, args, ctx) => {
      return ctx.dataSources.showsAPI.getShows()
    },
    show: (root, args, ctx) => {
      return ctx.dataSources.showsAPI.getShow(args.id)
    }
  },
}

module.exports = { resolvers }
