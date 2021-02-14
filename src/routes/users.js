const router = require('express').Router() // ME permite tener un objeto para crear rutas

router.get('/users/signin', (req, res) => {
    res.send('Signin page')
})

router.get('/users/signup', (req, res) => {
    res.send('Formulario de autenticación corriendo')
})

module.exports = router;