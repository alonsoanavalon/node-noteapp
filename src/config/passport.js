const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require ('../models/Users')


passport.use(new localStrategy({
    usernameField:'email'

}, async (email, password, done) => {
    const user = await User.findOne({email:email})
    if (!user){
        return done (null, false, {message:'Not user found'})
    } else {
        const match = await user.matchPassword(password)
        if(match) {
            return done(null, user) // en este mando al user pq todo esta correcto encontro usuario y match password
        } else {
            return done (null, false, {message:'Incorrect Password'})
        }
    }
})) 




// Para definir una nueva estrategia de autenticacion, en el NEW strategy debo poner los parámetros que el usuario me enviará

// EL callback done sirve para terminar el proceso de autenticación ya sea Exitoso o Success

// done(error, )

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})