import jwt from 'jsonwebtoken'

import { refreshTokens } from '../utils/tokens'

export const jwtCheck = ({ SECRET, SECRET2, userAPI }) => async (req, res) => {
  const token = req.cookies.token || req.headers.token

  try {
    const { user: { id } } = await jwt.verify(token, SECRET)
    req.user = await userAPI.getUserById(id)
  } catch (err) {
    const refreshToken = req.cookies['refresh-token'] || req.headers['refresh-token'] || req.headers['refreshtoken']

    const newTokens = await refreshTokens(token, refreshToken, userAPI, SECRET, SECRET2)
    if (newTokens.token && newTokens.refreshToken) {
      res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
      res.set('x-token', newTokens.token)
      res.set('x-refresh-token', newTokens.refreshToken)
    }
    req.user = newTokens.user
  }
  req.next()
}
