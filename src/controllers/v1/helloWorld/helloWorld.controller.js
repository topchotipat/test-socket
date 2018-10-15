import { HttpMethod, route } from '@spksoft/koa-decorator'
import Resp from './test'

@route('/v1/test/:id')
class HelloWorld {
  @route('/', HttpMethod.GET)
  async main(ctx) {
    const { id } = ctx.params
    ctx.res.ok({
      data: Resp(id)
    })
  }
}

export default HelloWorld
