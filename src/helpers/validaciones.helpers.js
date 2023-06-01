const { validationResult } = require('express-validator')

/**
 * Muestra una lista de los campos que no pasaron la validación.
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
const resultadoValidaciones = (req, res, next) => {
  try {
    validationResult(req).throw()

    return next()
  } catch (ex) {
    let param = ex.array().map(element => {
      return element.path
    })

    param = [...new Set(param)]

    return res.status(406).json({
      ok: false,
      mensaje: 'Error al validar los datos',
      data: param
    })
  }
}

module.exports = resultadoValidaciones
