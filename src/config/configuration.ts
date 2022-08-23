import * as Joi from 'joi';

export const configuration = ((() => Joi.object({
  CLIENT_URL: Joi.required(),
  DB_HOST: Joi.required(),
  DB_NAME: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_USER: Joi.required(),
  DB_PORT: Joi.required(),
  NODE_ENV: Joi.required(),
  PORT: Joi.required(),
}))())