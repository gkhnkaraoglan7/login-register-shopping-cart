const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const mongoStore =require("connect-mongo")(session);////Verilerin cookie olarak tutulmasını sağlayacak
const cookieParser = require("cookie-parser");
const passport = require("passport");
const userRouter = require("./routes/users");
const productRouter = require("./routes/product");
const addToCart = require("./routes/addToCart");
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

const PORT = 5000 || process.env.PORT;

/////Flash MiddleWares
app.use(cookieParser("passportTutorial"));
app.use(
  session({
    cookie: { maxAge: 60000*13*25 },////Ne kadar süre oturum açık kalacak
    resave: false,
    secret: "NewWebSite",
    saveUninitialized: true,
    store:new mongoStore({mongooseConnection:mongoose.connection})
  })
);
app.use(flash());
//// Passport İşlemleri ////
///Kullanıcı Giriş Yaptığında Kullanıcı Bilgilerini Localde Tutmak İçin
app.use(passport.initialize());
app.use(passport.session());

////Global - Res.Locals////Verileri Globalde Gönderiyoruz
app.use((req, res, next) => {
  res.locals.flashSuccess = req.flash("flashSuccess"); ///flash'ı Local olarak Globalde tutuyoruz
  res.locals.flashError = req.flash("flashError");
  ///Passport Flash
  res.locals.passportFailure = req.flash("error");
  res.locals.passportSuccess = req.flash("success");

  /////Logged In User////Giriş yapan kullanıcının bilgilerini globalde paylaşıyoruz
  res.locals.user = req.user;
  /////session bilgisini globale paylaşmak için 
  /////Diğer sayfalarda da kullanabilicez bu sayede
  res.locals.session=req.session;

  next();
});

//// MongoDb Connection
mongoose.connect(
  "mongodb+srv://gkhnkaraoglan:mongobaglanti@websitegkhn-ktibp.azure.mongodb.net/website?retryWrites=true&w=majority",
  error => {
    if (!error) {
      console.log("connected to mongo");
    }
  }
);

//// Handlebars //// Template ////

app.engine("handlebars", exphbs({ defaultLayout: "mainLayout" }));
app.set("view engine", "handlebars");

////Body Parser MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
//// Routers ////
app.use(userRouter);
app.use(productRouter);
app.use(addToCart);

app.use((req, res, next) => {
  res.render("static/404");
});
app.listen(PORT, () => {
  console.log("App Started");
});
