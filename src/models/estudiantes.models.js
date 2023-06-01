const db = require('./../config/db')

const buscar = async () => {
  const [filas] = await db.execute('SELECT * FROM estudiantes WHERE deleted=0')

  return filas
}

const buscarPorId = async (id) => {
  const [filas] = await db.execute('SELECT * FROM estudiantes WHERE id=? AND deleted=0', [id])

  return filas
}

const buscarExistente = async (datosEstudiante) => {
  const { nombre, edad, grado } = datosEstudiante

  const [filas] = await db.execute('SELECT * FROM estudiantes WHERE nombre=? AND edad=? AND grado=? AND deleted=0', [nombre, edad, grado])

  return filas
}

const nuevo = async (datosEstudiante) => {
  const { nombre, edad, grado } = datosEstudiante

  const [resultado] = await db.execute('INSERT INTO estudiantes (nombre, edad, grado, deleted) VALUES (?, ?, ?, 0)', [nombre, edad, grado])

  return resultado
}

const actualizar = async (id, datosEstudiante) => {
  const { nombre, edad, grado } = datosEstudiante

  const [resultado] = await db.execute('UPDATE estudiantes SET nombre=?, edad=?, grado=?, deleted=0 WHERE id=?', [nombre, edad, grado, id])

  return resultado
}

const eliminar = async (id) => {
  console.log('id', id)
  const [resultado] = await db.execute('UPDATE estudiantes SET deleted=1 WHERE id=?', [id])

  return resultado
}

module.exports = { buscar, buscarPorId, buscarExistente, nuevo, actualizar, eliminar }
