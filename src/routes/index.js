const router = require('express').Router() // ME permite tener un objeto para crear rutas


router.get('/', (req, res) => {
    res.send('Index')
})

router.get('/about', (req, res) => {
    res.send('About')
})
module.exports = router;