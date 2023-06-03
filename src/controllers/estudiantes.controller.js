const { matchedData } = require('express-validator')
const { errorServer } = require('../helpers/error.helper')
const estudianteModel = require('./../models/estudiantes.model')

/**
 * Permite obtener la lista de estudiantes registrados.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 * - data: Los datos de los usuarios obtenidos de la base de datos.
 */
const buscar = async (req, res) => {
  try {
    const estudiantes = await estudianteModel.buscar()

    return res.status(200).json({
      ok: true,
      mensaje: estudiantes.length !== 0 ? 'Lista de estudiantes.' : 'El sistema no tiene estudiantes registrados',
      data: estudiantes
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite obtener al estudiante con el ID solicitado.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 * - data: El estudiante encontrado con el ID solicitado.
 */
const buscarPorId = async (req, res) => {
  try {
    const { id } = matchedData(req)

    const estudiante = await estudianteModel.buscarPorId(id)

    if (estudiante.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un estudiante registrado con el ID solicitado'
      })
    }

    return res.status(200).json({
      ok: true,
      mensaje: 'Estudiante solicitado.',
      data: estudiante
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite obtener los cursos en lo que el estudiante solicitado está inscripto.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 * - data: Lista de cursos en los que se encuentra inscripto el estudiante.
 */
const cursosDelEstudiante = async (req, res) => {
  try {
    const { id } = matchedData(req)

    //
    const estudiante = await estudianteModel.buscarPorId(id)
    if (estudiante.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un estudiante registrado con el ID solicitado'
      })
    }

    const cursosDelEstudiante = await estudianteModel.cursos(id)

    res.status(200).json({
      ok: true,
      mensaje: cursosDelEstudiante.length !== 0 ? 'Cursos del estudiante.' : 'El alumno no está inscripto en ningún curso.',
      data: cursosDelEstudiante
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite registrar un nuevo estudiante.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 */
const nuevo = async (req, res) => {
  try {
    const { nombre, edad, grado } = matchedData(req)

    // Existencia
    const existente = await estudianteModel.buscarExistente({ nombre, edad, grado })
    if (existente.length !== 0) {
      return res.status(409).json({
        ok: false,
        mensaje: 'Ya se encuentra un estudiante registrado con los datos enviados'
      })
    }

    // Inserción
    const nuevo = await estudianteModel.nuevo({ nombre, edad, grado })
    if (nuevo.affectedRows === 0) {
      return res.status(422).json({
        ok: false,
        mensaje: 'No se insertó el estudiante.'
      })
    }

    // Insertado
    return res.status(201).json({
      ok: true,
      mensaje: 'El estudiante se registró correctamente.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite actualizar un estudiante registrado.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 */
const actualizar = async (req, res) => {
  try {
    const { id, nombre, edad, grado } = matchedData(req)

    // Existencia
    const estudiante = await estudianteModel.buscarPorId(id)
    if (estudiante.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El estudiante que intenta editar no se encuentra registrado.'
      })
    }

    // Edición
    const editado = await estudianteModel.actualizar(id, { nombre, edad, grado })
    if (editado.affectedRows === 0) {
      return res.status(422).json({
        ok: false,
        mensaje: 'No se editó ningún estudiante.'
      })
    }

    // Editado
    return res.status(200).json({
      ok: true,
      mensaje: 'El estudiante se actualizó correctamente.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite eliminar un estudiante registrado.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 */
const eliminar = async (req, res) => {
  try {
    const { id } = matchedData(req)

    // Existencia
    const estudiante = await estudianteModel.buscarPorId(id)
    if (estudiante.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El estudiante que intenta eliminar no se encuentra registrado.'
      })
    }

    // Eliminación
    const eliminar = await estudianteModel.eliminar(id)
    if (eliminar.affectedRows === 0) {
      return res.status(422).json({
        ok: false,
        mensaje: 'No se eliminó ningún estudiante.'
      })
    }

    // Eliminado
    return res.status(200).json({
      ok: true,
      mensaje: 'El estudiante se eliminó correctamente.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

module.exports = { buscar, buscarPorId, cursosDelEstudiante, nuevo, actualizar, eliminar }
