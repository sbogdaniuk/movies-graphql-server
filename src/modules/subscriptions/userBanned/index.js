import { withFilter } from 'apollo-server-express'

export const resolvers = {
  Subscription: {
    userBanned: {
      subscribe: (_, __, { pubsub, psEvents }) => pubsub.asyncIterator([psEvents.USER_BANNED]),
      // subscribe: withFilter(
      //   (_, __, { pubsub, psEvents }) => pubsub.asyncIterator([psEvents.USER_BANNED]),
      //   (payload, variables) => payload.userBanned.id === variables.id,
      // ),
    },
  },
}
