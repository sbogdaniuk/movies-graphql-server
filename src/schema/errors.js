import { createError } from 'apollo-errors'

export const UnknownError = createError('UnknownError', {
  message: 'Something went wrong',
})

export const NotFound = createError('NotFound', {
  message: 'Not found',
})

export const ParamsError = createError('ParamsError', {
  message: 'Invalid params',
})

export const MutationError = createError('MutationError', {
  message: 'Can\'t do it',
})

export const AuthenticationError = createError('AuthenticationError', {
  message: 'Who are you?'
});

export const RoleError = createError('RoleError', {
  message: 'Wrong permission'
});
