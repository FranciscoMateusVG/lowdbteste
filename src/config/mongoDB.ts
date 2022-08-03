import { MongoClient, ServerApiVersion } from 'mongodb'

const uri =
  ''
export const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
})
