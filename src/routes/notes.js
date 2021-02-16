const router = require('express').Router()
const Note = require('../models/Note') // Se crea la clase Note a partir del SCHEMA que importa /models/Note.js (mongoose Schema)

router.get('/notes', (req, res) => {
    res.send('Notass')
})

router.get('/notes/add', (req, res ) => {
    res.render('notes/new-note')

})

router.post('/notes/new-note', async (req, res ) => {
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

  
            const newNote = new Note({name, description}) /* Acá se crea un nuevo objeto clase Nota /schematizada */
            await newNote.save()
          /*   res.render('notes/new-note', {
                success:`La nota "${name}" ha sido añadida exitosamente`
            }) */
            res.redirect('/notes')
           
 
      
        
        

    }


    
})


module.exports = router;