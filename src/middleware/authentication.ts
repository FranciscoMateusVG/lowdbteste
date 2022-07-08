import { KoaCTX } from '../utils/types'
import Koa from 'koa'

import bcrypt from 'bcrypt'

// PasswordAdmin = 'NYx@PX6cEqBiN3#s#8!ECyKnxs@Sjn9GhBd'
// PasswordPartner = 'iq??qc56YxQs6PGKgThF@RoCba&hk656kNi'

export const authentication = async (ctx: KoaCTX, next: Koa.Next) => {
  try {
    const key = ctx.query.key as string
    const adminHash =
      '$2b$10$dEJSWOtn4JoGBuHUEdHbQuNjeczRrMD62Z2rzpfgxunP2AU9QW.6y'
    const partnerHash =
      '$2b$10$mpY09PpwFKp5Gp3CAfUAVOXh/stzoCBuHR1DYVkZahgHVsr0KFFKC'
    const admin = await bcrypt.compare(key, adminHash)
    const partner = await bcrypt.compare(key, partnerHash)

    if (admin) {
      ctx.profile = 0
      await next()
    } else if (partner) {
      ctx.profile = 1
      await next()
    } else {
      throw new Error('Invalid key')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      ctx.status = 500
      ctx.body = `Things exploded (${error.message})`
    }
  }
}
