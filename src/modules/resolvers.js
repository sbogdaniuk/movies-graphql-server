export const resolvers = {
  Query: {
    nodeEnv: async () => {
      return process.env.NODE_ENV
    }
  }
}
