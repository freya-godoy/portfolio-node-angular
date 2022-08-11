//configuracion de express 
'use strict'
let express = require('express');
let app = express();

//Archivos de rutas

let project_routes = require('./routes/project');

//Configuracion de middlewares
// permite leer el body de tipo application/json que consiste en un objeto JSON
app.use(express.json());
// Permite poder codificar datos que llegan con la peticion POST en formato urlencoded application/x-www-form-urlencoded y serializarla en un objeto Json
//app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }))

//configuracion CORS 
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Rutas
app.use('/api', project_routes);


//exportar archivos
module.exports = app;



/*
 EJEMPLOS DE CREAR SERVIDOR CON NODEJS 
// rutas
app.post('/test', (req, res) => {
    console.log(req.query.nombre);
    res.status(200).send({
        message: "Hola mundos desde mi API de NodeJS"
    });

});


//Ruta, texto sin Json

app.get('/', (req, res) => {
    res.status(200).send(
        "<h1> Pagina de Inicio </h1>"
    );

});  
 API para una aplicación de lista de tareas pendientes,
 puede usar un GET método para recuperar la lista actual de tareas, un POST método 
 para crear una nueva tarea y un método PUT o PATCH para editar una tarea existente.

 //REQ: datos que envio desde el cliente o la peticion que haga 
 // RES: response que envio*/

