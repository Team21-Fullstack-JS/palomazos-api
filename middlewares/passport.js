const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../model/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, function (email, password, done) {
    User.findOne({ where: { email } })
        .then( user => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { message: 'Email o Password incorrecto.' });
            }

            return done(null, user);
        })
        .catch(err => done(err));
}));