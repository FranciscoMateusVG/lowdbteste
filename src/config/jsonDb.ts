import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

export const jsondb = new JsonDB(new Config('myDataBase', true, false, '/'))
