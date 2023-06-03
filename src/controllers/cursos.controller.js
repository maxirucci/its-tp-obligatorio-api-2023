const { matchedData } = require('express-validator')
const { errorServer } = require('../helpers/error.helper')
const cursosModel = require('./../models/cursos.model')
const estudianteModel = require('./../models/estudiantes.model')

/**
 * Permite obtener la lista de cursos registrados.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 * - data: Los datos de los usuarios obtenidos de la base de datos.
 */
const buscar = async (req, res) => {
  try {
    const cursos = await cursosModel.buscar()

    return res.status(200).json({
      ok: true,
      mensaje: cursos.length !== 0 ? 'Lista de cursos.' : 'El sistema no tiene cursos registrados.',
      data: cursos
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite obtener al curso con el ID solicitado.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 * - data: El curso encontrado con el ID solicitado.
 */
const buscarPorId = async (req, res) => {
  try {
    const { id } = matchedData(req)

    const curso = await cursosModel.buscarPorId(id)

    if (curso.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un curso registrado con el ID solicitado'
      })
    }

    return res.status(200).json({
      ok: true,
      mensaje: 'curso solicitado.',
      data: curso
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite obtener la lista de estudiantes inscriptos en el curso solicitado.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 * - data: Lista de estudiantes instcriptos en el curso.
 */
const listaEstudiantes = async (req, res) => {
  try {
    const { id } = matchedData(req)

    const curso = await cursosModel.buscarPorId(id)
    if (curso.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un curso registrado con el ID solicitado'
      })
    }

    const listaEstudiantes = await cursosModel.estudiantes(id)

    return res.status(200).json({
      ok: true,
      mensaje: 'Lista de estudiantes del curso.',
      data: listaEstudiantes
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite registrar un nuevo curso.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 */
const nuevo = async (req, res) => {
  try {
    const { nombre, descripcion } = matchedData(req)

    // Existencia
    const existente = await cursosModel.buscarExistente({ nombre, descripcion })
    if (existente.length !== 0) {
      return res.status(409).json({
        ok: false,
        mensaje: 'Ya se encuentra un curso registrado con los datos enviados'
      })
    }

    // Inserción
    const nuevo = await cursosModel.nuevo({ nombre, descripcion })
    if (nuevo.affectedRows === 0) {
      return res.status(422).json({
        ok: false,
        mensaje: 'No se insertó el curso.'
      })
    }

    // Insertado
    return res.status(201).json({
      ok: true,
      mensaje: 'El curso se registró correctamente.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite registrar e inscribir en un curso existente a un nuevo estudiante no registrado.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 */
const nuevoEstudiante = async (req, res) => {
  try {
    const { id, nombre, edad, grado } = matchedData(req)

    // Existencia curso
    const curso = await cursosModel.buscarPorId(id)
    if (curso.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe el curso en el que desea inscribir al estudiante.'
      })
    }

    // Existencia alumno
    const alumno = await estudianteModel.buscarExistente({ nombre, edad, grado })
    if (alumno.length !== 0) {
      return res.status(409).json({
        ok: false,
        mensaje: 'Ya se encuentra registrado un alumno con los datos ingresados.'
      })
    }

    // Procedimiento almacenado --> Inserción de un nuevo alumno en el curso deseado.
    await cursosModel.nuevoEstudiante(id, { nombre, edad, grado })

    return res.status(201).json({
      ok: true,
      mensaje: 'Nuevo estudiante inscripto correctamente.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite inscribir en un curso existente a un estudiante registrado.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 */
const inscribirEstudiante = async (req, res) => {
  const { id, idEstudiante } = matchedData(req)

  // Existencia curso
  const curso = await cursosModel.buscarPorId(id)
  if (curso.length === 0) {
    return res.status(404).json({
      ok: false,
      mensaje: 'El curso en el que desea inscribir al estudiante no se encuentra registrado.'
    })
  }

  // Existencia alumno
  const estudiante = await estudianteModel.buscarPorId(idEstudiante)
  if (estudiante.length === 0) {
    return res.status(404).json({
      ok: false,
      mensaje: 'El estudiante que desea inscribir no se encuentra registrado.'
    })
  }

  // Inscripción --> Inserción de una relación estudiantes_cursos
  const inscribirEstudiante = await cursosModel.inscribirEstudiante(id, idEstudiante)
  console.log(inscribirEstudiante)

  return res.status(200).json({
    ok: true,
    mensaje: 'Estudiante inscripto correctamente.'
  })
}

/**
 * Permite actualizar un curso registrado.
 * @param {Request} req
 * @param {Response} res
 * @return {JSON} Un objeto JSON que contiene la respuesta.
 * - ok: Un valor booleano que indica si la operación fue exitosa.
 * - mensaje: Un mensaje descriptivo sobre la respuesta.
 */
const actualizar = async (req, res) => {
  try {
    const { id, nombre, descripcion } = matchedData(req)

    // Existencia
    const curso = await cursosModel.buscarPorId(id)
    if (curso.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El curso que intenta editar no se encuentra registrado.'
      })
    }

    // Edición
    const editado = await cursosModel.actualizar(id, { nombre, descripcion })
    if (editado.affectedRows === 0) {
      return res.status(422).json({
        ok: false,
        mensaje: 'No se editó ningún curso.'
      })
    }

    // Editado
    return res.status(200).json({
      ok: true,
      mensaje: 'El curso se actualizó correctamente.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

/**
 * Permite eliminar un curso registrado.
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
    const curso = await cursosModel.buscarPorId(id)
    if (curso.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El curso que intenta eliminar no se encuentra registrado.'
      })
    }

    // Eliminación
    const eliminar = await cursosModel.eliminar(id)
    if (eliminar.affectedRows === 0) {
      return res.status(422).json({
        ok: false,
        mensaje: 'No se eliminó ningún curso.'
      })
    }

    // Eliminado
    return res.status(200).json({
      ok: true,
      mensaje: 'El curso se eliminó correctamente.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

const eliminarEstudiante = async (req, res) => {
  try {
    const { id, idEstudiante } = matchedData(req)

    // Eliminación
    const eliminar = await cursosModel.eliminarEstudiante(id, idEstudiante)
    if (eliminar.affectedRows === 0) {
      return res.status(422).json({
        ok: false,
        mensaje: 'No se eliminó ningún estudiante.'
      })
    }

    return res.status(200).json({
      ok: true,
      mensaje: 'Se eliminó el estudiante del curso.'
    })
  } catch (error) {
    errorServer(res, error)
  }
}

module.exports = { buscar, buscarPorId, listaEstudiantes, nuevo, nuevoEstudiante, inscribirEstudiante, actualizar, eliminar, eliminarEstudiante }
