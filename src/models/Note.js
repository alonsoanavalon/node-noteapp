const {Schema, model } = require('mongoose')

const noteSchema = new Schema ({
    name: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now()
    }
})

module.exports = model('Note', noteSchema)