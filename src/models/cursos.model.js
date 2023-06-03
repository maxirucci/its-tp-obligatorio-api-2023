const db = require('../config/db')

const buscar = async () => {
  const [filas] = await db.execute('SELECT * FROM cursos')

  return filas
}

const buscarPorId = async (id) => {
  const [filas] = await db.execute('SELECT * FROM cursos WHERE id=?', [id])

  return filas
}

const buscarExistente = async (datos) => {
  const { nombre } = datos

  const [filas] = await db.execute('SELECT * FROM cursos WHERE nombre=?', [nombre])

  return filas
}

const estudiantes = async (id) => {
  const [filas] = await db.execute(
    'SELECT e.* ' +
    'FROM estudiantes_cursos ' +
      'INNER JOIN estudiantes AS e ON estudiantes_cursos.id_estudiante = e.id ' +
    'WHERE estudiantes_cursos.id_curso = ?', [id])

  return filas
}

const nuevo = async (datos) => {
  const { nombre, descripcion } = datos

  const [resultado] = await db.execute('INSERT INTO cursos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion])

  return resultado
}

const nuevoEstudiante = async (id, datosEstudiante) => {
  const { nombre, edad, grado } = datosEstudiante

  const [resultado] = await db.execute('CALL SP_cursos_nuevoEstudiante(?, ?, ?, ?)', [id, nombre, edad, grado])

  return resultado
}

const inscribirEstudiante = async (id, idEstudiante) => {
  const [resultado] = await db.execute('INSERT INTO estudiantes_cursos (id_estudiante, id_curso) VALUES (?, ?)', [id, idEstudiante])

  return resultado
}

const actualizar = async (id, datos) => {
  const { nombre, descripcion } = datos

  const [resultado] = await db.execute('UPDATE cursos SET nombre=?, descripcion=? WHERE id=?', [nombre, descripcion, id])

  return resultado
}

const eliminar = async (id) => {
  console.log('id', id)
  const [resultado] = await db.execute('DELETE FROM cursos WHERE id=?', [id])

  return resultado
}

const eliminarEstudiante = async (id, idEstudiante) => {
  const [resultado] = await db.execute('DELETE FROM estudiantes_cursos WHERE id_curso=? AND id_estudiante=?', [id, idEstudiante])

  return resultado
}

module.exports = { buscar, buscarPorId, buscarExistente, estudiantes, nuevo, nuevoEstudiante, inscribirEstudiante, actualizar, eliminar, eliminarEstudiante }
