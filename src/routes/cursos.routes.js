const express = require('express')
const router = express.Router()
const cursos = require('./../controllers/cursos.controller')
const idValidator = require('./../middlewares/validators/id.validator')
const cursosValidator = require('./../middlewares/validators/cursos.validator')
const estudianteValidator = require('./../middlewares/validators/estudiantes.validator')

router.get('/',
  cursos.buscar)

router.get('/:id',
  idValidator.id,
  cursos.buscarPorId)

router.get('/:id/estudiantes',
  idValidator.id,
  cursos.listaEstudiantes)

router.post('/',
  cursosValidator.model,
  cursos.nuevo)

router.post('/:id/estudiantes/',
  idValidator.id,
  estudianteValidator.model,
  cursos.nuevoEstudiante)

router.post('/:id/estudiantes/:idEstudiante',
  idValidator.id,
  estudianteValidator.model,
  cursos.inscribirEstudiante)

router.put('/:id',
  idValidator.id,
  cursosValidator.model,
  cursos.actualizar)

router.delete('/:id',
  idValidator.id,
  cursos.eliminar)

router.delete('/:id/estudiante/:idEstudiante',
  idValidator.id,
  cursos.eliminarEstudiante)

module.exports = router
