const express = require('express')
const router = express.Router()

//importar o controlador de pensamentos tought
const ToughtController = require('../controllers/ToughtController')

// importar o middleware de autenticação de usuário
const checkAuth = require('../helpers/auth').checkAuth

router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.get('/', ToughtController.showToughts)

//Exportar a rota
module.exports = router
