const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();




module.exports = ruta;


//Funcion asincronica para crear cursos
async function crearCurso(body){
    let curso = new Curso({
        titulo : body.titulo,
        descripcion : body.descripcion,
        alumnos : body.alumnos,
        calificacion : body.calificacion
    });
    return await curso.save();
}

//Endpoint de tipo POST para el recurso de CURSOS
ruta.post('/', (req, res) =>{
    let resultado = crearCurso(req.body);

    resultado.then(curso => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

//funcion asincronica para actualizar cursos
async function actualizarCursos(id, body){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    },{new: true});
    return curso;
}

//Endpoitn de tipo PUT para el recurso de CURSOS
ruta.put('/:id', (req, res)=> {
    let resultado = actualizarCursos(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
})

//funcion asincronica para inactivar cursos
async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            estado: false
        }
    },{new: true});
    return curso;
}

//Endpoint de tipo DELETE para el recurso de CURSOS
ruta.delete('/:id', (req, res) =>{
    let resultado = desactivarCurso(req.params.id);

    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    });
});


//funcion asincronica para listar los cursos activos
async function listarCursosActivos(){
    let cursos = await Curso.find({"estado":true});
    return cursos;
}

//Endpoint Listar CURSOS
ruta.get('/', (req,res) => {
   let resultado = listarCursosActivos();
   resultado.then(cursos => {
    res.json(cursos);
   }).catch(err => {
    res.status(400).json(err);
   })
});