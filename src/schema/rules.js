import { rule, shield, and, or, not } from 'graphql-shield'
import { NotAuthenticatedError } from './errors'

export const isAuthenticated = rule()(async (parent, args, { user }, info) => {
  if (user) return true
  return new NotAuthenticatedError()
})
