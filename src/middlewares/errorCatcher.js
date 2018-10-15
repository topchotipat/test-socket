import { UNKNOWN_ENDPOINT, UNKNOWN_ERROR } from '../constants/error'

export default async (ctx, next) => {
  try {
    await next()
    if (!ctx.body && (!ctx.status || ctx.status === 404)) ctx.res.notFound(UNKNOWN_ENDPOINT)
  } catch (err) {
    ctx.res.internalServerError(UNKNOWN_ERROR)
    ctx.app.emit('error', err, ctx)
  }
}
