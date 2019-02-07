export const me = async (obj, args, { dataSources, user }, info) => {
  if (user) {
    const res = await dataSources.userAPI.getUser({ id: user.id })
    return res || null
  }

  return null
}
