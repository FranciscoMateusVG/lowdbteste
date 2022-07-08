import { client } from '../config/mongoDB'
// import {
//   checkPartnerDoesntExists,
//   checkPartnerExists,
//   deletePartnerDB,
//   getPartnerDB,
//   postPartnerDB,
//   putPartnerDB
// } from '../utils/jsonDB'
import {
  checkPartnerDoesntExists,
  checkPartnerExists,
  deletePartnerDB,
  getPartnerDB,
  postPartnerDB,
  putPartnerDB
} from '../utils/mongoDB'
import { postPartnerSchema, putPartnerSchema } from '../utils/schemas'
import { KoaCTX, Partner } from '../utils/types'

export const getPartners = async (ctx: KoaCTX) => {
  try {
    const result = await getPartnerDB('')
    ctx.body = result
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
    checkPartnerDoesntExists(name)
    const result = getPartnerDB(name)
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
    checkPartnerExists(name)
    const result = postPartnerDB(name, body)

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
    checkPartnerDoesntExists(name)
    const result = putPartnerDB(name, body)
    ctx.body = result
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 500
      ctx.body = `Things exploded (${error.message})`
    }
  }
}

export const deletePartner = async (ctx: KoaCTX) => {
  try {
    const { name } = ctx.params
    checkPartnerDoesntExists(name)
    deletePartnerDB(name)
    ctx.body = `${name} - Deleted`
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 500
      ctx.body = `Things exploded (${error.message})`
    }
  }
}
