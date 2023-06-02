const express = require('express')
const router = express.Router()
const profesores = require('./../controllers/profesores.controller')
const idValidator = require('./../middlewares/validators/id.validator')
const profesoresValidator = require('./../middlewares/validators/profesores.validator')

router.get('/',
  profesores.buscar)

router.get('/:id',
  idValidator.id,
  profesores.buscarPorId)

router.post('/',
  profesoresValidator.model,
  profesores.nuevo)

router.put('/:id',
  idValidator.id,
  profesoresValidator.model,
  profesores.actualizar)

router.delete('/:id',
  idValidator.id,
  profesores.eliminar)

module.exports = router
