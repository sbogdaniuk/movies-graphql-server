import { createError } from 'apollo-errors'

export const UnknownError = createError('UnknownError', {
  message: 'Something went wrong',
})

export const NotFound = createError('NotFound', {
  message: 'Not Found',
})

export const InvalidParamsError = createError('InvalidParams', {
  message: 'Invalid Params',
})

export const MutationError = createError('MutationError', {
  message: 'You are not allowed',
})
