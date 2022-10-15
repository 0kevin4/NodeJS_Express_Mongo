const express = require('express');
const logic = require('../logic/usuario_logic');
const ruta = express.Router();


  


//Endpoint de Tipo GET para el recurso usuarios. lista todos los usuarios activos
ruta.get('/',(req, res) => {
    let resultado = logic.listarUsuarioActivos();
    resultado.then(usuarios => {
        res.json(usuarios)
    }).catch(err => {
        res.status(400).json(
            {
                err
            }
        )
    })
})

//Endpoint de tipo POST para el recurso de USUARIOS
  ruta.post('/', (req, res) => {
      let body = req.body;
  
      const {error, value} = logic.schema.validate({nombre: body.nombre, email: body.email});
      if(!error){
          let resultado = logic.crearUsuario(body);
          
          resultado.then( user => {
              res.json({
                  valor: user
              })
          }).catch( err => {    
              res.status(400).json({
                  err
              })
          });
      }else{
          res.status(400).json({
              error
          })
      }   
  });



//Endpoint de tipo Put para actualizar los datos del usuario
  ruta.put('/:email', (req, res) => {
    const {error, value} = logic.schema.validate({nombre: req.body.nombre});
    if(!error){
        let resultado = logic.actualizarUsuario(req.params.email, req.body);
        resultado.then(valor =>{
            res.json({
                valor
            })
        }).catch(err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});



//Endpoint de tipo DELETE para el recurso de los Usuario
ruta.delete('/:email', (req, res) => {
    let resultado = logic.desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario : valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});



module.exports = ruta;

 