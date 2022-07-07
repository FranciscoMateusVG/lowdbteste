import Router from 'koa-router'
import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import {
  getPartner,
  getPartners,
  postPartner,
  putPartner
} from '../controller/dbControllers'

export const router = new Router()

const db = new JsonDB(new Config('myDataBase', true, false, '/'))

router.get('/partners', getPartners)

router.get('/partner/:name', getPartner)

router.post('/partner/:name', postPartner)

router.put('/partner/:name', putPartner)
