import { errors } from '../../../constants'

export const resolvers = {
  Mutation: {
    banUser: {
      resolve: async (obj, { id }, { dataSources, user, pubsub, psEvents }) => {

        const badUser = await dataSources.userAPI.getUserById(id)
        if (!badUser) {
          // user with provided email not found
          throw new errors.NotFound()
        }

        if (badUser.id === user.id) {
          throw new errors.MutationError({ message: 'You can\'t ban yourself' })
        }

        if (badUser.isAdmin) {
          throw new errors.RoleError({ message: 'You can\'t ban admins' })
        }

        const bannedUser = await dataSources.userAPI.banUser(id)

        pubsub.publish(psEvents.USER_BANNED, { userBanned: bannedUser })

        return bannedUser
      },
    },
  },
}
