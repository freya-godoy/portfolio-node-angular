//Empezamos con la concexion a la base de datos desde node   
'use strict'
//Voy a crear una variable para cargar el modulo de mongoose
const mongoose = require('mongoose'); //objeto en la variable
const app = require('./app');
const port = 3700;

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio', connectOptions)
    //metodo.then para corroborar si me conecte
    .then(() => {
        console.log("Conexion a la base de datos establecida exito...")

        //creacion del servidor
        app.listen(port, () => {
            console.log("servidor corriendo correctamente en la url: localhost:3700");
        });

    })
    .catch(error => console.log('The connection to the database failed.', error));