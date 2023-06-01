const express = require('express')
const router = express.Router()
const fs = require('fs')

const PATH_RUTAS = __dirname

const archivosEnDirectorio = fs.readdirSync(PATH_RUTAS)

console.log('--> Cargando rutas...')
archivosEnDirectorio.forEach((archivo) => {
  const archivoSinExtension = RemoverExtension(archivo)

  if (archivoSinExtension !== 'index') {
    router.use(`/${archivoSinExtension}`, require(`./${archivo}`))
    console.log('    Ruta ' + archivoSinExtension + ' cargada.')
  }
})

function RemoverExtension (archivo) {
  return archivo.split('.').shift()
}

module.exports = router
