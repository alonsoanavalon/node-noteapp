const router = require('express').Router() // ME permite tener un objeto para crear rutas

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
})

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/users/signup', (req, res) => {
    const {name, email, password, confirm_password} = (req.body)
    const errors = []

    console.log(req.body)

    if (!name) errors.push({error:'Escriba una contraseña'})
    if (!email) errors.push({error:'Escriba un email válido'})
    if(password != confirm_password){
        res.send('La contraseña no es igual')
        errors.push({error:'Las contraseñas son diferentes'})
    } 
    if(password.length < 4) {
        errors.push({error:'Escriba una contraseña que supere 4 caracteres'})
    }

    if (errors.length > 0) {

        res.render('users/signup', {
            errors
        })
    } 
})

module.exports = router;