const db = require('./../config/db')

const buscar = async () => {
  const [filas] = await db.execute('SELECT * FROM estudiantes')

  return filas
}

const buscarPorId = async (id) => {
  const [filas] = await db.execute('SELECT * FROM estudiantes WHERE id=?', [id])

  return filas
}

const buscarExistente = async (datosEstudiante) => {
  const { nombre, edad, grado } = datosEstudiante

  const [filas] = await db.execute('SELECT * FROM estudiantes WHERE nombre=? AND edad=? AND grado=?', [nombre, edad, grado])

  return filas
}

const nuevo = async (datosEstudiante) => {
  const { nombre, edad, grado } = datosEstudiante

  const [resultado] = await db.execute('INSERT INTO estudiantes (nombre, edad, grado) VALUES (?, ?, ?)', [nombre, edad, grado])

  return resultado
}

const actualizar = async (id, datosEstudiante) => {
  const { nombre, edad, grado } = datosEstudiante

  const [resultado] = await db.execute('UPDATE estudiantes SET nombre=?, edad=?, grado=? WHERE id=?', [nombre, edad, grado, id])

  return resultado
}

const eliminar = async (id) => {
  console.log('id', id)
  const [resultado] = await db.execute('DELETE FROM estudiantes WHERE id=?', [id])

  return resultado
}

module.exports = { buscar, buscarPorId, buscarExistente, nuevo, actualizar, eliminar }
