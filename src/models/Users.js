const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new Schema ({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    date: {
        type:Date,
        default: Date.now()
    }
})

                                    /*  OJO */
        /* Los mètodos no son de la clase en si, sino de las instancias de las clases, me puede dar error de "NO ES UNA FUNCION" */

/* Esta funcion la ocuparemos cuando el usuario se REGISTRE */
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10) // un hash de 10 caracteres
    const hash = bcrypt.hash(password, salt)
    return hash
}

/* Esta funcion es de ECMAS5 ya que debe hacer referencia al password que viene en el UserSchema y no al Scope dentro de la misma función con THIS podremos entrar en el scope del Schema */

/* Esta funcion la ocuparemos cuando el usuario se LOGEE (comparar) */
UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password) // contraseña q me da el usuario y la que tengo en la base de datos
}

module.exports = model('User', UserSchema)