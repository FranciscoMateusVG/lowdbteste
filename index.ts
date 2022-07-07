import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

interface Partner {
  template: string
  restore: boolean
  modal: boolean
}

const db = new JsonDB(new Config('myDataBase', true, false, '/'))

const app = new Koa()
app.use(bodyParser())

const router = new Router()

router.get('/partners', (ctx, next) => {
  const { name } = ctx.params

  try {
    //Will be typed as Partner in your IDE
    const result = db.getObject<Partner>(`/`)
    // ctx.router available
    ctx.body = Object.keys(result)
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Partner already exists'
  }
})

router.get('/partner/:name', (ctx, next) => {
  const { name } = ctx.params
  const partnerExists = db.exists(`/${name}`)
  try {
    if (!partnerExists) throw new Error('Partner doesnt exist')

    //Will be typed as Partner in your IDE
    const result = db.getObject<Partner>(`/${name}`)

    // ctx.router available
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Partner doesnt exist'
  }
})

router.post('/partner/:name', (ctx, next) => {
  const body = ctx.request.body as Partner
  const { name } = ctx.params
  const partnerExists = db.exists(`/${name}`)
  try {
    if (partnerExists) throw new Error('Partner already exists')

    db.push(`/${name}`, body)

    //Will be typed as Partner in your IDE
    const result = db.getObject<Partner>(`/${name}`)

    // ctx.router available
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Partner already exists'
  }
})

router.put('/partner/:name', (ctx, next) => {
  const body = ctx.request.body as Partner
  const { name } = ctx.params
  const partnerExists = db.exists(`/${name}`)
  try {
    if (!partnerExists) throw new Error('Partner doesnt exist')

    db.push(`/${name}`, body, false)

    //Will be typed as Partner in your IDE
    const result = db.getObject<Partner>(`/${name}`)

    // ctx.router available
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Partner doesnt exists'
  }
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
