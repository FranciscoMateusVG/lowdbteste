import { ParameterizedContext, DefaultContext } from 'koa'
import Router from 'koa-router'

export interface CustomKoaAppContext {
  profile: number
}

export interface Partner {
  template: string
  restore: boolean
  modal: boolean
}

export type KoaCTX = ParameterizedContext<
  CustomKoaAppContext,
  DefaultContext,
  any
>
