import fetch from 'node-fetch'
import jwt from 'jsonwebtoken'

import { refreshTokens } from '../utils/tokens'
import { API } from '../config'

const getUserById = id => fetch(`${API}/users/${id}`).then(res => res.json())

export const jwtCheck = ({ SECRET, SECRET2 }) => async (req, res) => {
  // req.cookies.token
  const token = req.headers.token

  try {
    const { user: { id } } = await jwt.verify(token, SECRET)
    // Validate user from token
    req.user = await getUserById(id)
  } catch (err) {
    // req.cookies['refresh-token']
    const refreshToken = req.headers['refresh-token'] || req.headers['refreshtoken']

    const newTokens = await refreshTokens(token, refreshToken, getUserById, SECRET, SECRET2)
    // if (newTokens.token && newTokens.refreshToken) {
    //   res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
    //   res.set('x-token', newTokens.token)
    //   res.set('x-refresh-token', newTokens.refreshToken)
    // }
    req.user = newTokens.user
  }

  req.next()
}
