const router = require('express').Router() // ME permite tener un objeto para crear rutas
const User = require('../models/Users')

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
})

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/users/signup', async (req, res) => {
    const {name, email, password, confirm_password} = (req.body)
    const errors = []

    console.log(req.body)

    if (!name) errors.push({error:'Escriba una contraseña'})
    if (!email) errors.push({error:'Escriba un email válido'})
    if(password != confirm_password){

        errors.push({error:'Las contraseñas son diferentes'})
    } 
    if(password.length < 4) {
        errors.push({error:'Escriba una contraseña que supere 4 caracteres'})
    }

    if (errors.length > 0) {

        res.render('users/signup', {
            errors, name, email, password, confirm_password
        })
    } else {

        const emailUser = await User.findOne({"email":email})

        if(emailUser){
            req.flash('error_msg', 'El email está en uso')
            res.redirect('/users/signup')
        }
            console.log('Creando usuario')
            const newUser = new User ({
                name,
                email,
                password
            })
            newUser.password = await newUser.encryptPassword(password) // Estoy reescribiendo password por el password encryptado   
            await newUser.save()
            req.flash('success_msg', 'Estas registrado') // Guardo en la variable succes_msg el mensaje a mostrar (previamente realizada la logica en messages.hbs que es renderizado por el main.hbs(layout) y previamente     res.locals.success_msg = req.flash('success_msg') en INDEX.JS )
            res.redirect('/users/signin') // Aca puedo renderizar cualquier pantalla que forme parte de mismo layout y me imprimirá el mensaje.
       

 
    } 
})

module.exports = router;