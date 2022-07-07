import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { KoaCTX, Partner } from '../utils/types'

const db = new JsonDB(new Config('myDataBase', true, false, '/'))

export const getPartners = (ctx: KoaCTX) => {
  try {
    const result = db.getObject<Partner>(`/`)
    ctx.body = Object.keys(result)
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Partner already exists'
  }
}

export const getPartner = (ctx: KoaCTX) => {
  const { name } = ctx.params
  const partnerExists = db.exists(`/${name}`)
  try {
    if (!partnerExists) throw new Error('Partner doesnt exist')
    const result = db.getObject<Partner>(`/${name}`)
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Partner doesnt exist'
  }
}

export const postPartner = (ctx: KoaCTX) => {
  const body = ctx.request.body as Partner
  const { name } = ctx.params
  const partnerExists = db.exists(`/${name}`)
  try {
    if (partnerExists) throw new Error('Partner already exists')
    db.push(`/${name}`, body)
    const result = db.getObject<Partner>(`/${name}`)
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Partner already exists'
  }
}

export const putPartner = (ctx: KoaCTX) => {
  const body = ctx.request.body as Partner
  const { name } = ctx.params
  const partnerExists = db.exists(`/${name}`)
  try {
    if (!partnerExists) throw new Error('Partner doesnt exist')
    db.push(`/${name}`, body, false)
    const result = db.getObject<Partner>(`/${name}`)
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Partner doesnt exists'
  }
}
