const { check } = require('express-validator')
const resultadoValidaciones = require('./../../helpers/validaciones.helpers')

const id = [
  check('id').exists().notEmpty().isNumeric(),
  check('idEstudiante').optional().notEmpty().isNumeric(),

  (req, res, next) => {
    console.log('✔ ID')
    return resultadoValidaciones(req, res, next)
  }
]

module.exports = { id }
