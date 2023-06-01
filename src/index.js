require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT || 3000
const VERSION = '1.0'
const BASE_URL_API = `/api/${VERSION}`

const app = express()

// _MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(morgan())
app.set('charset', 'UTF-8')

// _RUTA DE PRUEBA
app.get(`${BASE_URL_API}/ping`, (req, res) => {
  res.send('pong')
})

// _ENDPOINTS
app.use(BASE_URL_API, require('./routes'))

// _INICIAR SERVER
app.listen(PORT, () => {
  console.log(`--> Sistema de gestión escolar API || v${VERSION} || Puerto: ${PORT}`)
})

module.exports = app
