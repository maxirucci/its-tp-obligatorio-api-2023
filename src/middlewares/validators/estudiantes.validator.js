const { body } = require('express-validator')
const resultadoValidaciones = require('./../../helpers/validaciones.helpers')

const model = [
  body('nombre').notEmpty().isString().isLength({ max: 100 }),
  body('edad').notEmpty().isNumeric(),
  body('grado').notEmpty().isString().isLength({ max: 50 }),

  (req, res, next) => {
    console.log('✔ ESTUDIANTE')

    return resultadoValidaciones(req, res, next)
  }
]

module.exports = { model }
