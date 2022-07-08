import { MongoClient, ServerApiVersion } from 'mongodb'

const uri =
  'mongodb+srv://admin:admin@zawarudo.saxte.gcp.mongodb.net/?retryWrites=true&w=majority'
export const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
})
