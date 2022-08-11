'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});
//Entidad que se guarda en la base de datos
module.exports = mongoose.model('Project', ProjectSchema);
// projects --> guarda los documentos a la coleccion 