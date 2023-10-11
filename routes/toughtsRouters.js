const express = require('express')
const router = express.Router()

//importar o controlador de pensamentos tought
const ToughtController = require('../controllers/ToughtController')

router.get('/', ToughtController.showToughts)

//Exportar a rota
module.exports = router
