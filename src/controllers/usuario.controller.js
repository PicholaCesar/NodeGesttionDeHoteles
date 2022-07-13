const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function registrarAdministrarAPP(req, res){
 
    var modeloUsuario = new Usuario();
    Usuario.findOne({email : 'AdminDeAPP'},(err, usuarioEncontrado)=>{
        if(!usuarioEncontrado){
            modeloUsuario.nombre = 'AdminDeAPP';
            modeloUsuario.email = 'AdminDeAPP';
            modeloUsuario.rol = 'AdminDeAPP';
            modeloUsuario.imagen = null

            bcrypt.hash("AdminDeAPP", null, null, (err, passwordEncriptada) => {
                modeloUsuario.password = passwordEncriptada;

                modeloUsuario.save((err, AdminGuardado)=>{
                    if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
                    if(!AdminGuardado) return res.status(500).send({mensaje: 'error al guardar el ADMINAPP'})

                    
                })
            })

            
        }else{
            console.log('El AdminDeAPP Registrado'.cyan)
        }

 
    })
}


function RegistrarUsuario(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if(parametros.nombre  && parametros.email && parametros.password) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'Usuario';
            usuarioModel.imagen = null;

            Usuario.find({ email : parametros.email }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }
}



function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(usuarioEncontrado){
            // COMPARO CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword)=>{//TRUE OR FALSE
                    // VERIFICO SI EL PASSWORD COINCIDE EN BASE DE DATOS
                    if ( verificacionPassword ) {
                        // SI EL PARAMETRO OBTENERTOKEN ES TRUE, CREA EL TOKEN
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }

                        
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide'});
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.'})
        }
    })
}

function obtenermiperfin(req, res){

    Usuario.findOne({_id: req.user.sub},(err, perfinEncotrado)=>{
        if(err) return res.status(500).send({mensaje: 'error en lapeticion'})
        if(!perfinEncotrado) return res.status(500).send({mensaje: 'no hay perfil'})

        return res.status(200).send({perfil: perfinEncotrado})
    })
}


function EditarUsuario(req, res) {;
    var parametros = req.body;    
    

    Usuario.findByIdAndUpdate(req.user.sub, parametros, {new : true},
        (err, usuarioActualizado)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!usuarioActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el Usuario'});
            
            return res.status(200).send({usuario : usuarioActualizado})
        })
}


function eliminarCuenta(req, res){

    var idPerfil = req.params.iduser

    Usuario.findByIdAndDelete(idPerfil,(err, eliminado)=>{
        if(err) return res.status(500).send({mensaje: 'error al eliminar usuario'})
        if(!eliminado) return res.status(500).send({mensaje: 'no se elimino el mensaje'})

        return res.status(200).send({eliminado: eliminado})
    })
}

module.exports = {
    RegistrarUsuario,
    Login,
    EditarUsuario,
    registrarAdministrarAPP,
    obtenermiperfin,
    eliminarCuenta
}



