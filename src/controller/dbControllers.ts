import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { postPartnerSchema, putPartnerSchema } from '../utils/schemas'
import { KoaCTX, Partner } from '../utils/types'

const db = new JsonDB(new Config('myDataBase', true, false, '/'))

export const getPartners = (ctx: KoaCTX) => {
  try {
    const result = db.getObject<Partner>(`/`)
    ctx.body = Object.keys(result)
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 500
      ctx.body = `Things exploded (${error.message})`
    }
  }
}

export const getPartner = (ctx: KoaCTX) => {
  try {
    const { name } = ctx.params
    const partnerExists = db.exists(`/${name}`)
    if (!partnerExists) throw new Error('Partner doesnt exist')
    const result = db.getObject<Partner>(`/${name}`)
    ctx.body = result
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 500
      ctx.body = `Things exploded (${error.message})`
    }
  }
}

export const postPartner = async (ctx: KoaCTX) => {
  try {
    const body = ctx.request.body as Partner
    await postPartnerSchema.validateAsync(body)

    const { name } = ctx.params
    const partnerExists = db.exists(`/${name}`)

    if (partnerExists) throw new Error('Partner already exists')

    db.push(`/${name}`, body)
    const result = db.getObject<Partner>(`/${name}`)
    ctx.body = result
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 500
      ctx.body = `Things exploded (${error.message})`
    }
  }
}

export const putPartner = async (ctx: KoaCTX) => {
  try {
    const { name } = ctx.params
    const body = ctx.request.body as Partner
    await putPartnerSchema.validateAsync(body)

    const partnerExists = db.exists(`/${name}`)
    if (!partnerExists) throw new Error('Partner does not exist')

    db.push(`/${name}`, body, false)
    const result = db.getObject<Partner>(`/${name}`)
    ctx.body = result
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 500
      ctx.body = `Things exploded (${error.message})`
    }
  }
}
