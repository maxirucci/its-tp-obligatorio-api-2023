const { matchedData } = require('express-validator')
const { errorServer } = require('../helpers/error.helper')
const profesoresModel = require('./../models/profesores.model')

/**
 * Permite obtener la lista de profesores registrados.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 * - data: Los datos de los usuarios obtenidos de la base de datos.
 */
const buscar = async (req, res) => {
  try {
    const profesores = await profesoresModel.buscar()

    return res.status(200).json({
      ok: true,
      mensaje: 'Lista de profesores.',
      data: profesores
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite obtener al profesor con el ID solicitado.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 * - data: El profesor encontrado con el ID solicitado.
 */
const buscarPorId = async (req, res) => {
  try {
    const { id } = matchedData(req)

    const profesor = await profesoresModel.buscarPorId(id)

    if (profesor.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un profesor registrado con el ID solicitado'
      })
    }

    return res.status(200).json({
      ok: true,
      mensaje: 'profesor solicitado.',
      data: profesor
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite registrar un nuevo profesor.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 */
const nuevo = async (req, res) => {
  try {
    const { nombre, especialidad, mail } = matchedData(req)

    // Existencia
    const existente = await profesoresModel.buscarExistente({ nombre, especialidad, mail })
    if (existente.length !== 0) {
      return res.status(409).json({
        ok: false,
        mensaje: 'Ya se encuentra un profesor registrado con los datos enviados'
      })
    }

    // Inserción
    const nuevo = await profesoresModel.nuevo({ nombre, especialidad, mail })
    if (nuevo.affectedRows === 0) {
      return res.status(422).json({
        ok: false,
        mensaje: 'No se insertó el profesor.'
      })
    }

    // Insertado
    return res.status(201).json({
      ok: true,
      mensaje: 'El profesor se registró correctamente.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite actualizar un profesor registrado.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 */
const actualizar = async (req, res) => {
  try {
    const { id, nombre, especialidad, mail } = matchedData(req)

    // Existencia
    const profesor = await profesoresModel.buscarPorId(id)
    if (profesor.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El profesor que intenta editar no se encuentra registrado.'
      })
    }

    // Edición
    const editado = await profesoresModel.actualizar(id, { nombre, especialidad, mail })
    if (editado.affectedRows === 0) {
      return res.status(422).json({
        ok: false,
        mensaje: 'No se editó ningún profesor.'
      })
    }

    // Editado
    return res.status(200).json({
      ok: true,
      mensaje: 'El profesor se actualizó correctamente.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite eliminar un profesor registrado.
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
    const profesor = await profesoresModel.buscarPorId(id)
    if (profesor.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El profesor que intenta eliminar no se encuentra registrado.'
      })
    }

    // Eliminación
    const eliminar = await profesoresModel.eliminar(id)
    if (eliminar.affectedRows === 0) {
      return res.status(422).json({
        ok: false,
        mensaje: 'No se eliminó ningún profesor.'
      })
    }

    // Eliminado
    return res.status(200).json({
      ok: true,
      mensaje: 'El profesor se eliminó correctamente.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

module.exports = { buscar, buscarPorId, nuevo, actualizar, eliminar }
