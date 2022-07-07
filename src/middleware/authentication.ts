import { KoaCTX } from '../utils/types'
import Koa from 'koa'

export const authentication = async (ctx: KoaCTX, next: Koa.Next) => {
  try {
    let authenticated = false

    if (authenticated) await next()

    throw new Error(`Authentication failed`)
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Authentication failed'
  }
}
