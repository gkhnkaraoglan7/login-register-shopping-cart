const formValidation = require("../validation/formValidation");

////Password Şifreleme
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const passport = require("passport");
///passportjs'yi burada çağırıyoruz Kullanıcının giriş işlemleri için
require('../authentication/passport/local');

module.exports.getUserLogin = (req, res, next) => {
  res.render("pages/login");
};
module.exports.getUserLogout = (req, res, next) => {
  req.logout();
  req.flash("success","Successfuly Logout");
  res.redirect("/login");
};
module.exports.getUserRegister = (req, res, next) => {
  res.render("pages/register");
};
module.exports.postUserLogin = (req, res, next) => {
  ///req.flash("error")
  ///req.flash("succes")
  passport.authenticate("local", {
    successRedirect: "/", ////Doğru giriş yapıldıysa Anasayfaya Yönlendirir
    failureRedirect: "/login", ///Hata varsa login sayfasına yönlendirir
    failureFlash: true, ///Hata varsa flash'ı aktif eder
    successFlash: true ///Doğru giriş yapıldıysa flash'ı aktif eder
  })(req, res, next);
};
module.exports.postUserRegister = (req, res, next) => {
  ////register formundaki verileri yazdırma
  const username = req.body.username;
  const password = req.body.password;
  const errors = [];
  const validationErrors = formValidation.registerValidation(
    username,
    password
  );
  if (validationErrors.length > 0) {
    return res.render("pages/register", {
      username: username,
      password: password,
      errors: validationErrors
    });
  } else {
    ///// Veri Tabannda kullanıcının bilgisi kontrol ediliyor
    ///// Veri varsa Errors veriyor
    User.findOne({
      username: username
    })
      .then(user => {
        if (user) {
          errors.push({ message: "Username Already In Use" });
          res.render("pages/register", {
            username,
            password,
            errors
          });
        } else {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
              if (err) throw err;
              ////// Veritabanına Kaydetme

              const newUser = new User({
                username: username,
                password: hash
              });
              newUser
                .save()
                .then(() => {
                  console.log("Successful New User");
                  req.flash("flashSuccess", "Succesfuly Registered");

                  res.redirect("/");
                })
                .catch(err => console.log(err));
            });
          });
        }
      })
      .catch(err => console.log(err));
  }
};
