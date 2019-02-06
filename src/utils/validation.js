import validator from 'validator'
import flatten from 'lodash/flatten'

const INVALID = 'INVALID'
const REQUIRED = 'REQUIRED'
const MIN_LENGTH = 'MIN_LENGTH'
const MAX_LENGTH = 'MAX_LENGTH'
const RANGE_LENGTH = 'RANGE_LENGTH'

export const validate = (rules) => (value) => {
  const errorRule = flatten([rules]).find(rule => rule(value))

  return errorRule ? errorRule(value) : undefined
}

export const RULES = {
  required: (value = '', options) => validator.isEmpty(value, options) && REQUIRED,
  maxLength: (max) => (value = '') => !validator.isLength(value, { min: undefined, max }) && MAX_LENGTH,
  minLength: (min) => (value = '') => !validator.isLength(value, { min }) && MIN_LENGTH,
  rangeLength: ({ min, max }) => (value = '') => !validator.isLength(value, { min, max }) && RANGE_LENGTH,

  email: value => !validator.isEmail(value) && INVALID,
}
