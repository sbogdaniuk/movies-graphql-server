import { sleep } from '../utils'

export const resolvers = {
  Query: {
    nodeEnv: async () => {
      await sleep(1000)
      return process.env.NODE_ENV
    }
  }
}
