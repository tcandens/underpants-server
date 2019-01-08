const Router = require('koa-router')
const webPush = require('web-push')

const { VAPID_PUBLIC, VAPID_PRIVATE } = process.env

const isDev = process.env.NODE_ENV !== 'production'

webPush.setVapidDetails(
  isDev
    ? 'http://localhost:3000'
    : 'https://electric-underpants-qjgjnudswj.now.sh/',
  VAPID_PUBLIC,
  VAPID_PRIVATE
)

const subscriptions = {}

module.exports = app => {
  const router = new Router()

  router.get('/push/key', async ctx => {
    ctx.body = VAPID_PUBLIC
  })

  router.get('/push/subscriptions', async ctx => {
    ctx.body = JSON.stringify(subscriptions)
  })

  router.post('/push/register', async ctx => {
    const { subscription, email } = ctx.request.body
    subscriptions[email] = subscription
    ctx.status = 201
  })

  router.post('/push/send', async ctx => {
    const { email, payload } = ctx.request.body

    const subscription = subscriptions[email]

    webPush.sendNotification(subscription, payload)
  })

  app.use(router.routes())

  return app
}
