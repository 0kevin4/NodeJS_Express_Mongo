const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hola mundo de Express!')
})


app.listen(port, () => {
    console.log('Ejemplo de aplicacion escuchando el puerto ${port}')
})