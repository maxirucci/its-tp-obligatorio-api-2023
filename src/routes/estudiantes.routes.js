const express = require('express')
const router = express.Router()
const estudiantesController = require('./../controllers/estudiantes.controller')

router.get('/', estudiantesController.buscar)
router.get('/:id', estudiantesController.buscarPorId)
router.post('/', estudiantesController.nuevo)
router.put('/:id', estudiantesController.actualizar)
router.delete('/:id', estudiantesController.eliminar)

module.exports = router
