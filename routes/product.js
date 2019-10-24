const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/",productController.getProduct);
router.get("/productDetails/:_id",productController.getProductDetails);
router.get("/computer",productController.computer);
router.get("/laptop",productController.laptop);
router.get("/mobilPhone",productController.mobilPhone);
router.get("/search",productController.search);
router.post("/search",productController.postsearch);
//// Sayfadan Post ile veri Gönderilmesis


module.exports = router;