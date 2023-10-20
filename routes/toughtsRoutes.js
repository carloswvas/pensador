const express = require("express");
const router = express.Router();

//Controller
const ToughtController = require("../controllers/ToughtController");

// impotar o middleware de verificação de usuário
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/add", checkAuth, ToughtController.createTought);
router.post("/add", checkAuth, ToughtController.createToughtSave);

//Rota para mostrar o formulário
router.get("/edit/:id", checkAuth, ToughtController.editTought);
//Rota para editar o formulário
router.post("/edit", checkAuth, ToughtController.editToughtSave);

router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.post("/remove", checkAuth, ToughtController.removeTought);
router.get("/", ToughtController.showToughts);

module.exports = router;
