const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
  email:{
    type:String,
    required: true
  },
  nombre:{
    type:String,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  estado: {
    type:Boolean,
    default: true
  },
  imagen: {
    type: String,
    required:false
  }
});