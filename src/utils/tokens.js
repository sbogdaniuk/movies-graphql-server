import jwt from 'jsonwebtoken'
import pick from 'lodash/pick'

export const createTokens = async (user, SECRET, SECRET2) => {
  const jwtUser = { user: pick(user, ['id']) }
  const createToken = jwt.sign(jwtUser, SECRET, { expiresIn: 60 * 60 * 1 }) // 1 day
  const createRefreshToken = jwt.sign(jwtUser, SECRET2, { expiresIn: 60 * 60 * 7 })  // 7 days

  return Promise.all([createToken, createRefreshToken])
}

export const refreshTokens = async (token, refreshToken, getUserById, SECRET, SECRET2) => {
  let userId = -1
  try {
    const { user: { id } } = jwt.decode(refreshToken)
    userId = id
  } catch (err) {
    return {}
  }

  if (!userId) return {}

  const user = await getUserById(userId)

  if (!user) return {}

  const refreshSecret = SECRET2 + user.password

  try {
    jwt.verify(refreshToken, refreshSecret)
  } catch (err) {
    return {}
  }

  const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret)

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  }
}
