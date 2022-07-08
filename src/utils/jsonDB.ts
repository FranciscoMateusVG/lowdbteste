import { jsondb } from '../config/jsonDb'
import { Partner } from './types'

export const checkPartnerExists = (partner: string) => {
  const partnerExists = jsondb.exists(`/${partner}`)

  if (partnerExists) throw new Error('Partner already exists')
}

export const checkPartnerDoesntExists = (partner: string) => {
  const partnerExists = jsondb.exists(`/${partner}`)
  if (!partnerExists) throw new Error('Partner doesnt exist')
}

export const getPartnerDB = (partner?: string) =>
  jsondb.getObject<Partner>(`/${partner}`)

export const postPartnerDB = (partner: string, body: Partner) => {
  jsondb.push(`/${partner}`, body)
  return jsondb.getObject<Partner>(`/${partner}`)
}

export const putPartnerDB = (partner: string, body: Partner) => {
  jsondb.push(`/${partner}`, body, false)
  return jsondb.getObject<Partner>(`/${partner}`)
}

export const deletePartnerDB = (partner: string) => {
  jsondb.delete(`/${partner}`)
}
