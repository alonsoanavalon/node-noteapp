const router = require('express').Router() // ME permite tener un objeto para crear rutas

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
})

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

module.exports = router;