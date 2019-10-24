const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();


//// Sayfa Yönlendirmesi
router.get("/login",userController.getUserLogin);

router.get("/logout",userController.getUserLogout);
router.get("/register",userController.getUserRegister);

//// Sayfadan Post ile veri Gönderilmesi

router.post("/login",userController.postUserLogin);
router.post("/register",userController.postUserRegister);

module.exports = router;