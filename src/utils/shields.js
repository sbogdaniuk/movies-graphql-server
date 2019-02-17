import { rule } from 'graphql-shield'
import { AuthenticationError, RoleError } from '../constants/errors'

export const isAuthenticated = rule()(async (parent, args, { res, user }, info) => {
  if (user) return true

  // res.clearCookie('token')
  // res.clearCookie('refresh-token')
  return new AuthenticationError()
})

export const isAdmin = rule()(async (parent, args, { user }, info) => {
  if (user.isAdmin) return true
  return new RoleError()
})
