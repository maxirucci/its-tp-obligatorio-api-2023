const errorServer = (res, error, mensaje = 'Algo salió mal') => {
  console.error('==== ERROR 500 ====\n', error)

  return res.status(500).json({
    ok: false,
    mensaje
  })
}

module.exports = { errorServer }
