import { PubSub } from 'apollo-server-express'

export const pubsub = new PubSub()

export const psEvents = {
  USER_BANNED: 'USER_BANNED',
}
