import jwt from 'jsonwebtoken'

import { refreshTokens } from './tokens'

export const jwtCheck = ({ SECRET, SECRET2, dataSources }) => async (req) => {
  const token = req.cookies.token || req.headers.token

  try {
    const { user } = await jwt.verify(token, SECRET)

    req.user = user
  } catch (err) {
    const refreshToken = req.cookies['refresh-token'] || req.headers['refresh-token']
    const newTokens = await refreshTokens(token, refreshToken, dataSources, SECRET, SECRET2)
    // if (newTokens.token && newTokens.refreshToken) {
    //   res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
    //   res.set('x-token', newTokens.token)
    //   res.set('x-refresh-token', newTokens.refreshToken)
    // }
    req.user = newTokens.user
  }
  req.next()
}
