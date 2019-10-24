const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrpypt = require("bcryptjs");
const User = require("../../models/User");


passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) return done(err, null, "Bir Hata Oluştu"); ////kullanıcıyı ararken bir sorun olursa

        if (!user) {////kullanıcı yoksa
            return done(null, false, "User Not Found");
        }
        bcrpypt.compare(password, user.password, (err, res) => {///db de şifrelenmiş passwordü eşleştiriyoruz
            if (res) { ////eğer eşleşmişse
                ////req.user
                return done(null, user, "Succesfuly Logged In");
            } else {
                return done(null, false, "Incorred Password")
            }
        })
    })
})
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});