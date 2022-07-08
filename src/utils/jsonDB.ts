import { jsondb } from '../config/jsonDb'
import { Partner } from './types'

export const checkPartnerExists = async (partner: string) => {
  const partnerExists = jsondb.exists(`/${partner}`)

  if (partnerExists) throw new Error('Partner already exists')
}

export const checkPartnerDoesntExists = async (partner: string) => {
  const partnerExists = jsondb.exists(`/${partner}`)
  if (!partnerExists) throw new Error('Partner doesnt exist')
}

export const getPartnerDB = async (partner?: string) =>
  jsondb.getObject<Partner>(`/${partner}`)

export const postPartnerDB = async (partner: string, body: Partner) => {
  jsondb.push(`/${partner}`, body)
  return jsondb.getObject<Partner>(`/${partner}`)
}

export const putPartnerDB = async (partner: string, body: Partner) => {
  jsondb.push(`/${partner}`, body, false)
  return jsondb.getObject<Partner>(`/${partner}`)
}

export const deletePartnerDB = async (partner: string) => {
  jsondb.delete(`/${partner}`)
}
