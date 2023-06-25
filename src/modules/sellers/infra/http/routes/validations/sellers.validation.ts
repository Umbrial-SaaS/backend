import { Joi, Segments, celebrate } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: {
    defaultInstagramUrl: Joi.string(),
    defaultCurrency: Joi.string(),
    defaultSupportEmail: Joi.string(),
    defaultTwitterUrl: Joi.string(),
  },
});
export const update = celebrate({
  [Segments.BODY]: {
    defaultInstagramUrl: Joi.string(),
    defaultCurrency: Joi.string(),
    defaultSupportEmail: Joi.string(),
    defaultTwitterUrl: Joi.string(),
  },
});
