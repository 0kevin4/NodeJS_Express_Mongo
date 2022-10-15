const express = require('express');
const Usuario = require('../models/usuario_model');
const joi = require('@hapi/joi');
const ruta = express.Router();



ruta.get('/', (req,res) => {
    res.json('Respuesta a peticion GET de USUARIOS funcionando perfectamente....');
});

module.exports = ruta;