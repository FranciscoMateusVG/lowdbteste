import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { authentication } from './middleware/authentication'
import { router } from './routes/routes'
import { CustomKoaAppContext } from './utils/types'

const app = new Koa<CustomKoaAppContext>()
app.use(bodyParser())
app.use(authentication)

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => console.log('listening on 3000'))
