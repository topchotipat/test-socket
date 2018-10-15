import User from '../../../../models/user/user.model'

export const createUser = async ({ username, password }) => {
  const user = new User({
    username,
    password
  })
  await user.save()
  return user
}

export const getUser = async ({ id }) => {
  const user = await User.findOneById(id)
  return user
}
