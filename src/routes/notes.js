const router = require('express').Router()
const Note = require('../models/Note') // Se crea la clase Note a partir del SCHEMA que importa /models/Note.js (mongoose Schema)

/* Renderizamos todas las notas existentes en  /allnotes */
router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({date:"desc"})
    res.render('notes/all-notes', {
        notes
    })
})
/* La vista ADD renderizará un formulario para agregar nueva nota */
router.get('/notes/add', (req, res ) => {
    res.render('notes/new-note')

})  
    /* Agregar nota */
router.post('/notes/new-note', async (req, res ) => {
    const {name, description} = req.body
    const errors = []

    if (!name) errors.push({error:'No se ha ingresado un nombre'})
    if (!description) errors.push({error:'No se ha ingresado una descripcion'})

    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            name,
            description
        }) 
    } else {
        const newNote = new Note({name, description}) /* Acá se crea un nuevo objeto clase Nota /schematizada */
        await newNote.save()
        req.flash('success_msg', 'Note Added Succesfully') // se crea el mensaje en la proxima ventana a abrir?? con render podria hacerlo tmb


    /*       res.render('notes/new-note', {
         success:`La nota "${name}" ha sido añadida exitosamente`
        }) */
      
        res.redirect('/notes')
      
    }
})

        /* Redireccionar al formulario para INICIAR editado de nota */
router.get('/notes/edit/:id', async (req, res) => {

    const toEditNote = await Note.findById(req.params.id)

    res.render('notes/edit-note', {
        toEditNote
    })
  
})
/* La edicion esta siendo realizada */
router.put('/notes/edit-note/:id', async (req, res) => {
    const {name, description} = req.body
    await Note.findByIdAndUpdate(req.params.id, {"name":name, "description":description}) 
    req.flash('success_msg', 'Note updated successfully')
    res.redirect('/notes')
})
        /* Eliminar nota */
/* router.get('/notes/delete/:id', async (req, res) => {
     await Note.findByIdAndDelete(req.params.id)
     res.redirect('/notes')
}) */ 

router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', "La nota ha sido eliminada correctamente")
    res.redirect('/notes')
})


module.exports = router;