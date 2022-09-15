import * as Joi from 'joi';

export const configuration = (() =>
  Joi.object({
    CLIENT_URL: Joi.required(),
    DB_HOST: Joi.required(),
    DB_NAME: Joi.required(),
    DB_PASSWORD: Joi.required(),
    DB_USER: Joi.required(),
    DB_PORT: Joi.required(),
    NODE_ENV: Joi.required(),
    PORT: Joi.required(),
    EMAIL_HOST: Joi.required(),
    EMAIL_USER: Joi.required(),
    EMAIL_PASSWORD: Joi.required(),
    EMAIL_FROM: Joi.required(),
    STRIPE_SECRET_KEY: Joi.required(),
    STRIPE_CURRENCY: Joi.required(),
  }))();
