export const resolvers = {
  Mutation: {
    signOut: async (parent, args, { res }) => {
      res.clearCookie('token')
      res.clearCookie('refresh-token')
      return { status: 200 }
    },
  },
}
