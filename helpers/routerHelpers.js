const Joi = require('joi')
// NOTE: validate from req.body
const validateBody = (schema) => {
  return (req, res, next) => {
    console.json(req.body);
    const validatorResult = schema.validate(req.body)
    if (validatorResult.error) {
      return res.status(200).json({ code: 401, message: validatorResult.error.message })
    } else {
      if (!req.value) req.value = {}
      if (!req.value['params']) req.value.params = {}
      req.value.body = validatorResult.value
      next()
    }
  }
}

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({ param: req.params[name] })
    if (validatorResult.error) {
      return res.status(200).json(JSON.parse(validatorResult.error))
    } else {
      if (!req.value) req.value = {}
      if (!req.value['params']) req.value.params = {}

      req.value.params[name] = req.params[name]
      next()
    }
  }
}

const schemas = {
  authSignUpSchema: Joi.object().keys({
    email: Joi.string().email().min(2).required(),
    password: Joi.string().min(5).required()
  }),

  authSignInSchema: Joi.object().keys({
    email: Joi.string().min(2).required(),
    password: Joi.string().min(5).required()
  })
}

module.exports = {
  validateBody,
  validateParam,
  schemas
}
