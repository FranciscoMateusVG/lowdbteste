import Joi from 'joi'

export const postPartnerSchema = Joi.object({
  template: Joi.string().required(),
  restore: Joi.boolean().required(),
  modal: Joi.boolean().required()
})

export const putPartnerSchema = Joi.object({
  template: Joi.string(),
  restore: Joi.boolean(),
  modal: Joi.boolean()
})
