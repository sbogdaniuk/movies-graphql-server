import { withFilter } from 'apollo-server-express'

import { pubsub, psEvents } from '../../../pubsub'

export const resolvers = {
  Subscription: {
    userBanned: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([psEvents.USER_BANNED]),
        (payload, variables) => payload.userBanned.id === variables.id,
      ),
    },
  },
}
