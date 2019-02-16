export const resolvers = {
  Query: {
    nodeEnv: () => process.env.NODE_ENV
  }
}
