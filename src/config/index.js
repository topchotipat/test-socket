import 'dotenv/config'

export default {
  helloWorld: process.env.HELLO_WORLD,
  mongoDB: process.env.MONGO_URL || null,
  port: process.env.PORT || 3000,
  log: {
    name: process.env.APP_NAME || 'koa-backend-boilerplate',
    streams: [
      {
        type: 'stream',
        stream: process.stdout,
        level: 'debug'
      }
    ]
  }
}
