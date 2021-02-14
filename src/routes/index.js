const router = require('express').Router() // ME permite tener un objeto para crear rutas


router.get('/', (req, res) => {
    res.render('index') // como ya está configurado en app.engine no es necesario establecer formato ni ruta.
})

router.get('/about', (req, res) => {
    res.render('about')
})
module.exports = router;