const db = require('../config/db')

const buscar = async () => {
  const [filas] = await db.execute('SELECT * FROM profesores')

  return filas
}

const buscarPorId = async (id) => {
  const [filas] = await db.execute('SELECT * FROM profesores WHERE id=?', [id])

  return filas
}

const buscarExistente = async (datos) => {
  const { nombre, especialidad, mail } = datos

  const [filas] = await db.execute('SELECT * FROM profesores WHERE nombre=? AND especialidad=? AND mail=?', [nombre, especialidad, mail])

  return filas
}

const nuevo = async (datos) => {
  const { nombre, especialidad, mail } = datos

  const [resultado] = await db.execute('INSERT INTO profesores (nombre, especialidad, mail) VALUES (?, ?, ?)', [nombre, especialidad, mail])

  return resultado
}

const actualizar = async (id, datos) => {
  const { nombre, especialidad, mail } = datos

  const [resultado] = await db.execute('UPDATE profesores SET nombre=?, especialidad=?, mail=? WHERE id=?', [nombre, especialidad, mail, id])

  return resultado
}

const eliminar = async (id) => {
  console.log('id', id)
  const [resultado] = await db.execute('DELETE FROM profesores WHERE id=?', [id])

  return resultado
}

module.exports = { buscar, buscarPorId, buscarExistente, nuevo, actualizar, eliminar }
