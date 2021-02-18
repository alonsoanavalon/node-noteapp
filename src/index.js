const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash') // Permite enviar mensajes entre multiples vistas, cuando agregamos o cuialquier cosa con dato mostramos mensaje a usuario, viene despues del session
const passport = require('passport')



                // initialization
const app = express(); // servidor funcionando
require('./database') // database funcionando
require('./config/passport')

                // Settings

app.set('port', process.env.PORT || 3000) // Lo que dice es que si existe un puerto en el PC que lo tome, sino q use el 3000
app.set('views',path.join(__dirname,'views') ) // para decirle a node donde esta mi carpeta, con path puedo sumar rutas, __ dirname me entrega la carpeta donde se ejecuta este archivo
app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    defaultLayout:'main',
    extname:'.hbs'
}))

app.set('view engine', '.hbs') // le doy el nombre que le puse arriba en el app.engine



                // Middlewares (Funciones q seran ejecutadas antes de que lleguen al servidor, o cuando lleguen al servidor antes de pasarselo a las rutas)

app.use(express.urlencoded({extended:false})) // recibo datos codificados del usuario, pero no quiero recibir imagenes ni archivos, solo datos.

app.use(methodOverride('_method')); // para que los formularios puedan no solo enviar post y get sino put y delete

app.use(session({
    secret:'mySecretApp',
    resave:true,
    saveUninitialized: true
})) // Con esto, express me permite autenticar al usuario y almacenar datos temporalmente

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

                // Variables globales (datos que toda nuestra apk tenga accesible)
app.use((req,res,next) => {

    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;

    next()
})
                //Rutas

app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

                //Archivos estáticos (Static files)
app.use(express.static(path.join(__dirname , 'public')))
                //Server is listening

app.listen(app.get('port'), () => {
    console.log('Servidor está escuchando en el puerto', app.get('port'))
})