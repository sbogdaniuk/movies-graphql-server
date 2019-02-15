import { rule } from 'graphql-shield'
import { AuthenticationError, RoleError } from './errors'

export const isAuthenticated = rule()(async (parent, args, { user }, info) => {
  console.log(111, 'SHIELD isAuthenticated')
  if (user) return true
  return new AuthenticationError()
})

export const isAdmin = rule()(async (parent, args, { user }, info) => {
  console.log(111, 'SHIELD isAdmin', user)
  if (user.isAdmin) return true
  return new RoleError()
})
