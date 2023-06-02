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

const nuevo = async (datos) => {
  const { nombre, descripcion } = datos

  const [resultado] = await db.execute('INSERT INTO cursos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion])

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

module.exports = { buscar, buscarPorId, buscarExistente, nuevo, actualizar, eliminar }
