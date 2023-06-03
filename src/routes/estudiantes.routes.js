const express = require('express')
const router = express.Router()
const estudiantes = require('./../controllers/estudiantes.controller')
const idValidator = require('./../middlewares/validators/id.validator')
const estudiantesValidator = require('./../middlewares/validators/estudiantes.validator')

router.get('/',
  estudiantes.buscar)

router.get('/:id',
  idValidator.id,
  estudiantes.buscarPorId)

router.get('/:id/cursos',
  idValidator.id,
  estudiantes.cursosDelEstudiante)

router.post('/',
  estudiantesValidator.model,
  estudiantes.nuevo)

router.put('/:id',
  idValidator.id,
  estudiantesValidator.model,
  estudiantes.actualizar)

router.delete('/:id',
  idValidator.id,
  estudiantes.eliminar)

module.exports = router
