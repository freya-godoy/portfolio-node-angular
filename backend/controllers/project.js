'use strict'
const project = require('../models/project');
const fs = require('fs');
const path = require('path');
const { exists } = require('../models/project');

const ProjectController = {

    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function (req, res) {
        return res.status(200).send({
            message: "Soy el metodo test"
        });
    },
    // funcion anonima 
    saveProject: function (req, res) {
        let newProject = new project();

        let params = req.body;
        newProject.name = params.name;
        newProject.description = params.description;
        newProject.category = params.category;
        newProject.year = params.year;
        newProject.langs = params.langs;
        newProject.image = null;
        // Metodo para guardar objeto en la base de datos, con funcion de callback
        newProject.save((err, projectStored) => {
            if (err) {
                console.log("error on save: ", err);
                return res.status(500).send({ message: 'Error al guardar el documento.' });// si se pruduce un error se ejecuta
            }
            if (!projectStored) return res.status(404).send({ message: 'No se ha podido guardar' })// en el caso que no se guarde
            return res.status(200).send({ project: projectStored });// Caso en el que no ocurra ninguno de los anteriores
        });

    },

    //Metodo para conseguir un proyecto, que nos devuelva un documento de la base de datos

    getProject: function (req, res) {
        let projectId = req.params.id;

        if (projectId == null) return res.status(404).send({ message: 'El projecto no existe' });// Si pongo el parametro opcional tengo que poner esta condicion

        project.findById(projectId, (err, project) => {//find busca en la base de datos + "ID" busca algo con ese ID

            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });// En caso de que hay un error
            if (!project) return res.status(404).send({ message: 'El projecto no existe.' });// En caso de que no llegue el proyecto
            return res.status(200).send({ // projecto cargado con exito sin los casos anteriores
                project
            });
        });
    },

    //Metodo para enlistar todos los proyectos para la base de datos

    getProjects: function (req, res) {
        project.find({}).exec((err, projects) => {
            if (err) return res.status(500).send({ message: 'Error al volver los datos.' });
            if (!projects) return res.status(404).send({ message: 'No hay prjectos para mostrar.' });
            return res.status(200).send({ projects });
        });
    },

    //Metodo para actualizar un proyecto

    updateProject: function (req, res) {
        let projectId = req.params.id;
        let update = req.body;

        project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({ message: 'error al actualizar' });

            if (!projectUpdated) return res.status(404).send({ message: 'No existe el proyecto' });

            return res.status(200).send({
                project: projectUpdated
            });
        })

    },

    //Metodo para eliminar un projecto

    deleteProject: function (req, res) {
        let projectId = req.params.id;

        project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if (err){
                console.log("remove error: ", err);
                return res.status(500).send({ message: 'No se ha podido eliminar el projecto' });

            } 
            if (!projectRemoved) return res.status(404).send({ message: 'No se puede eliminar este projecto' });

            return res.status(200).send({
                project: projectRemoved
            });
        });

    },

    //Metodos para subir ficheros/imagenes al projecto

    uploadImage: function (req, res) {
        let projectId = req.params.id;
        let fileName = 'Imagen no subida...';

        if (req.files) {

            let filePath = req.files.image.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];
            let extSplit = fileName.split('\.');
            let fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

                project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({ message: 'La imagen no se a subido' });

                    if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe y no se ah asignado la imagen' });

                    return res.status(200).send({
                        project: projectUpdated
                    });
                });

            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'La extension no es valida' });
                });




            }

            //No entra respuesta asi que ponemos un else
        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    },

    getImageFile: function(req, res){
        let file = req.params.image;
        let path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        });
    }

};

module.exports = ProjectController;