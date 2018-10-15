import 'babel-polyfill'

import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import gracefulShutdown from 'http-graceful-shutdown'
import { load } from '@spksoft/koa-decorator'

import config from './config'
import mongooseClient from './libraries/database/mongoose'
import logger from './libraries/logger/logger'
import log from './middlewares/log'
import requestId from './middlewares/requestId'
import errorCatcher from './middlewares/errorCatcher'
import errorHandler from './middlewares/errorHandler'
import responseHandler from './middlewares/responseHandler'

const app = new Koa()

app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb'
  })
)
app.use(compress())
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
)
app.use(requestId())
app.use(responseHandler())
app.use(errorCatcher)
app.on('error', errorHandler)
app.use(log({ logger }))

// // Connect to database
if (config.mongoDB && process.env.NODE_ENV !== 'test') {
  mongooseClient(config.mongoDB)
    .then(dbClient => {
      logger.info(
        { event: 'execute' },
        `Connected to ${dbClient.host}:${dbClient.port}/${dbClient.name}`
      )
    })
    .catch(err => {
      logger.error({ err, event: 'error' }, 'Unable to connect to database server!')
      process.exit(1)
    })
}

const apiRouter = load(path.resolve(__dirname, 'controllers'), '.controller.js')

app.use(apiRouter.routes())

const server = app.listen(config.port, () => {
  logger.info({ event: 'execute' }, `API server listening on ${config.port}`)
})

gracefulShutdown(server)
export default server
