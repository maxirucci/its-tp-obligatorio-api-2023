const express = require('express')
const router = express.Router()
const cursos = require('./../controllers/cursos.controller')
const idValidator = require('./../middlewares/validators/id.validator')
const cursosValidator = require('./../middlewares/validators/cursos.validator')

router.get('/',
  cursos.buscar)

router.get('/:id',
  idValidator.id,
  cursos.buscarPorId)

router.post('/',
  cursosValidator.model,
  cursos.nuevo)

router.put('/:id',
  idValidator.id,
  cursosValidator.model,
  cursos.actualizar)

router.delete('/:id',
  idValidator.id,
  cursos.eliminar)

module.exports = router
