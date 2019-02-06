import { formatError as apolloFormatError, isInstance } from 'apollo-errors'

import { logger } from '../libs'

export const formatError = error => {
  const { originalError } = error

  if (isInstance(originalError)) {
    // log internalData to stdout but not include it in the formattedError
    logger.warn(JSON.stringify({
      type: originalError.name,
      data: originalError.data,
      internalData: originalError.internalData,
    }, null, 2))
    logger.warn(originalError._stack)
  }

  return apolloFormatError(error)
}
