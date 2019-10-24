const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
var Cart = require("../controllers/cart");
//// Sayfadan Post ile veri Gönderilmesi

router.get("/add-to-cart/:_id", function(req, res, next) {
  console.log("sayfa geldi");
  var productId = req.params._id;
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect("/productDetails/" + productId);
    }
    cart.add(product, product._id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/productDetails/" + productId);
  });
  console.log(productId);
});

router.get("/cart", function(req, res, next){
  if (!req.session.cart) {
    res.redirect("/");
  }
  var cart = new Cart(req.session.cart);
  res.render("pages/cart", {
    product:cart.generalArray()
  });
  console.log(cart.generalArray());
});

router.get("/reducer/:id",function(req,res,next){
  var productId = req.params.id;
  var cart= new Cart(req.session.cart ? req.session.cart:{});
  cart.reduceByOne(productId);
  req.session.cart=cart;
  res.redirect("/cart");
})
router.get("/removeAll/:id",function(req,res,next){
  var productId = req.params.id;
  var cart= new Cart(req.session.cart ? req.session.cart:{});
  cart.removeAll(productId);
  req.session.cart=cart;
  res.redirect("/cart");
})
module.exports = router;
