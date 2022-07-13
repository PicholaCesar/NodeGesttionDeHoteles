const mongoose = require('mongoose');
const app = require('./app');
const colors  = require("colors")
const controladorUsuario = require("./src/controllers/usuario.controller")


const URLdb = 'mongodb://localhost:27017/';
const dbName = 'GestionDeHoteles'

mongoose.Promise = global.Promise;                                                                  //function (){}
mongoose.connect(URLdb + dbName, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("conencatdo a la base de datos".magenta);

    app.listen(3000, function () {
        controladorUsuario.registrarAdministrarAPP();
        console.log("Hola IN6AV, esta corriendo en el puerto 3000!".cyan)
    })
    
 
    
  

}).catch(error => console.log(error));