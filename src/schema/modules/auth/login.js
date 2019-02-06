import bcrypt from 'bcrypt'
import pickBy from 'lodash/pickBy'
import isEmpty from 'lodash/isEmpty'
import { createResolver } from 'apollo-resolvers'

import { createTokens, RULES, validate } from '../../../utils'
import { InvalidParamsError, MutationError } from '../../errors'
import { baseResolver } from '../../resolvers'

const checkArgs = baseResolver.createResolver((obj, args, ctx) => {
  const { input: { email, password } } = args

  const errors = pickBy({
    email: validate([RULES.required, RULES.email])(email),
    password: validate(RULES.required)(password),
  })

  if (!isEmpty(errors)) {
    throw new InvalidParamsError({ data: errors })
  }
})

export const login = checkArgs.createResolver(async (obj, args, ctx) => {
  const { input: { email, password } } = args
  const { dataSources, SECRET, SECRET2 } = ctx


  const user = await dataSources.userAPI.getUser({ email })
  if (!user) {
    // user with provided email not found
    throw new MutationError({ message: 'Invalid login' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    // bad password
    throw new MutationError({ message: 'Invalid login' })
  }

  const [token, refreshToken] = await createTokens(user, SECRET, SECRET2 + user.password)

  // const tokenOptions = {
  //   maxAge: 60 * 60 * 24 * 7, // 7d
  //   httpOnly: true,
  // }
  // ctx.res.cookie('token', token, tokenOptions)
  // ctx.res.cookie('refresh-token', refreshToken, tokenOptions)

  return { token, refreshToken }
})
