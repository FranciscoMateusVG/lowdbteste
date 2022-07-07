import { ParameterizedContext } from 'koa'
import Router from 'koa-router'

export interface Partner {
  template: string
  restore: boolean
  modal: boolean
}

export type KoaCTX = ParameterizedContext<
  any,
  Router.IRouterParamContext<any, {}>,
  any
>
