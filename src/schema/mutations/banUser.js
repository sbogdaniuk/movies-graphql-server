import { gql, PubSub, withFilter } from 'apollo-server-express'

import { MutationError, NotFound, RoleError } from '../errors'


const pubsub = new PubSub()
const USER_BANNED = 'USER_BANNED'

const typeDefs = gql`
  extend type Subscription {
    userBanned(id: ID!): User!
  }

  extend type Mutation {
    banUser(id: ID!): User!
  }
`

const resolvers = {
  Subscription: {
    userBanned: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([USER_BANNED]),
        (payload, variables) => payload.userBanned.id === variables.id,
      )
    },
  },
  Mutation: {
    banUser: {
      resolve: async (obj, { id }, { dataSources, user }) => {

        const badUser = await dataSources.userAPI.getUserById(id)
        if (!badUser) {
          // user with provided email not found
          throw new NotFound()
        }

        if (badUser.id === user.id) {
          throw new MutationError({ message: 'You can\'t ban yourself' })
        }

        if (badUser.isAdmin) {
          throw new RoleError({ message: 'You can\'t ban admins' })
        }

        const bannedUser = await dataSources.userAPI.banUser(id)

        pubsub.publish(USER_BANNED, { userBanned: bannedUser })

        return bannedUser
      },
    },
  },
}

export const banUser = { typeDefs, resolvers }
