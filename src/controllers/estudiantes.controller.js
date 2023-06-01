const { errorServer } = require('../helpers/error.helper')
const estudianteModel = require('./../models/estudiantes.models')

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
      mensaje: 'Lista de usuarios.',
      data: estudiantes
    })
  } catch (error) {
    errorServer(error)
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
    const { id } = req.params

    const estudiante = await estudianteModel.buscarPorId(id)
    console.log(estudiante)

    res.status(200).json({
      ok: true,
      mensaje: 'Estudiante solicitado.',
      data: estudiante
    })
  } catch (error) {
    errorServer(error)
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
    const { nombre, edad, grado } = req.body

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
    errorServer(error)
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
    const { id } = req.params
    const { nombre, edad, grado } = req.body

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
    errorServer(error)
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
    const { id } = req.params

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
    errorServer(error)
  }
}

module.exports = { buscar, buscarPorId, nuevo, actualizar, eliminar }
