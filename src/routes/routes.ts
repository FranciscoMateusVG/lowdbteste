import Router from 'koa-router'
import Koa from 'koa'
import {
  getPartner,
  getPartners,
  postPartner,
  putPartner
} from '../controller/dbControllers'
import { KoaCTX } from '../utils/types'

export const router = new Router()

const onlyAdmin = async (ctx: KoaCTX, next: Koa.Next) => {
  try {
    if (ctx.profile === 0) {
      await next()
    } else {
      throw new Error('Admins only')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      ctx.status = 500
      ctx.body = `Things exploded (${error.message})`
    }
  }
}

router.get('/partners', onlyAdmin, getPartners)

router.get('/partner/:name', getPartner)

router.post('/partner/:name', onlyAdmin, postPartner)

router.put('/partner/:name', onlyAdmin, putPartner)
