const errorServer = (error, mensaje='Algo salió mal') => {
  console.error('==== ERROR 500 ====\n', error)

  res.status(500).json({
    ok: false,
    mensaje
  })
}

module.exports = { errorServer }