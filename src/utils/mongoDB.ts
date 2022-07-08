import { jsondb } from '../config/jsonDb'
import { client } from '../config/mongoDB'
import { Partner } from './types'

export const checkPartnerExists = (partner: string) => {
  const partnerExists = jsondb.exists(`/${partner}`)

  if (partnerExists) throw new Error('Partner already exists')
}

export const checkPartnerDoesntExists = (partner: string) => {
  const partnerExists = jsondb.exists(`/${partner}`)
  if (!partnerExists) throw new Error('Partner doesnt exist')
}

export const getPartnerDB = async (partner: string) => {
  await client.connect()
  const database = client.db('myFirstDatabase')
  const partnerCollection = database.collection('partners')
  let partners = await partnerCollection.find().toArray()
  console.log(partners)

  client.close()

  return partners
}

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
