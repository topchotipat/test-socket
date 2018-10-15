import { HttpMethod, route } from '@spksoft/koa-decorator'
import User from '../../../models/user/user.model'

@route('/v1/users')
class Users {
  @route('/:username', HttpMethod.GET)
  async getUser(ctx) {
    const { username } = ctx.params
    const user = await User.find({ username })
    ctx.res.ok({
      data: { ...user },
      message: 'show user detail'
    })
  }

  @route('/', HttpMethod.POST)
  async createUser(ctx) {
    const { username, password } = ctx.request.body
    const user = new User({ username, password })
    ctx.body = await user.save()
    ctx.res.ok({
      data: { ...(await user.save()) },
      message: 'create user'
    })
  }
}

export default Users
