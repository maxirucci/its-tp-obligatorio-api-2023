const db = require('../config/db')

const buscar = async () => {
  const [filas] = await db.execute('SELECT * FROM estudiantes')

  return filas
}

const buscarPorId = async (id) => {
  const [filas] = await db.execute('SELECT * FROM estudiantes WHERE id=?;', [id])

  return filas
}

const buscarExistente = async (datos) => {
  const { nombre, edad, grado } = datos

  const [filas] = await db.execute('SELECT * FROM estudiantes WHERE nombre=? AND edad=? AND grado=?;', [nombre, edad, grado])

  return filas
}

const cursos = async (id) => {
  const [filas] = await db.execute(
    'SELECT c.' +
    'FROM estudiantes_cursos ' +
      'INNER JOIN cursos AS c ON estudiantes_cursos.id_curso = c.id ' +
    'WHERE estudiantes_cursos.id_estudiante = ?;', [id]
  )

  return filas
}

const nuevo = async (datos) => {
  const { nombre, edad, grado } = datos

  const [resultado] = await db.execute('INSERT INTO estudiantes (nombre, edad, grado) VALUES (?, ?, ?);', [nombre, edad, grado])

  return resultado
}

const actualizar = async (id, datos) => {
  const { nombre, edad, grado } = datos

  const [resultado] = await db.execute('UPDATE estudiantes SET nombre=?, edad=?, grado=? WHERE id=?;', [nombre, edad, grado, id])

  return resultado
}

const eliminar = async (id) => {
  console.log('id', id)
  const [resultado] = await db.execute('DELETE FROM estudiantes WHERE id=?;', [id])

  return resultado
}

module.exports = { buscar, buscarPorId, buscarExistente, cursos, nuevo, actualizar, eliminar }
