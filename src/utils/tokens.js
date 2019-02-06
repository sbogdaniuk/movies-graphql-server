import jwt from 'jsonwebtoken'
import pick from 'lodash/pick'

export const createTokens = async (user, SECRET, SECRET2) => {
  const jwtUser = pick(user, ['id', 'isAdmin', 'isBanned'])
  const createToken = jwt.sign({ user: jwtUser }, SECRET, { expiresIn: '10m' })
  const createRefreshToken = jwt.sign({ user: jwtUser }, SECRET2, { expiresIn: '1d' })

  return Promise.all([createToken, createRefreshToken])
}

export const refreshTokens = async (token, refreshToken, dataSources, SECRET, SECRET2) => {
  let userId = -1
  try {
    const { user: { id } } = jwt.decode(refreshToken)
    userId = id
  } catch (err) {
    return {}
  }

  if (!userId) return {}

  const user = await dataSources.userAPI.getUser(userId)

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
