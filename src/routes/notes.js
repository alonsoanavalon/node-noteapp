const router = require('express').Router()
const Note = require('../models/Note')

router.get('/notes', (req, res) => {
    res.send('Notass')
})

router.get('/notes/add', (req, res ) => {
    res.render('notes/new-note')

})

router.post('/notes/new-note', (req, res ) => {
    const {name, description} = req.body
    const errors = []

    if (!name) errors.push({info:'No se ha ingresado un nombre'})
    if (!description) errors.push({info:'No se ha ingresado una descripcion'})



    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            name,
            description
        }) 
    } else {

        const toCreateNote = async (name, description) => {
            const newNote = new Note({name, description})
            const savedNote = newNote.save()
            return savedNote
        }
        toCreateNote(name, description)
        .then(savedNote => console.log(savedNote))
        .then(console.log('El archivo ha sido guardado con éxito'))
        .then(res.render('notes/new-note', {
            name,
            success: `La nota "${name}" ha sido creada con éxito`
          
        }))
        .catch(err => console.log(err))
        

    }


    
})


module.exports = router;