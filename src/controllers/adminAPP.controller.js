const modeloUsuario = require('../models/usuario.model')
const bycrip = require('bcrypt-nodejs')

function obtenerUsuarios(req, res){

    modeloUsuario.find({rol:'Usuario'},(err, listaDeUsuarios)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'});
        if(!listaDeUsuarios)  return res.status(500).send({mensaje: 'error al encontrar Usuarios'})
        return res.status(200).send({Usuarios: listaDeUsuarios})
    })
}

function agregarHotel(req, res){

    var parametro = req.body;
    var modelUsuario = new modeloUsuario();

    modeloUsuario.findOne({email: parametro.email},(err, hotelEncotrado)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'})
        if(!hotelEncotrado){

            modelUsuario.nombre = parametro.nombre;
            modelUsuario.direccion= parametro.direccion,
            modelUsuario.telefono = parametro.telefono,
            modelUsuario.descripcion= parametro.descripcion,
            modelUsuario.email = parametro.email;
            modelUsuario.rol = 'AdminDeHotel'
            modelUsuario.imagen = null;

            bycrip.hash(parametro.password, null,null,(err, passwordCifrado)=>{
                modelUsuario.password = passwordCifrado;

                modelUsuario.save((err, hotelRegistrado)=>{
                    if(err) return res.status(500).send({mensaje: 'error en la peticion'})
                    if(!hotelRegistrado) return res.status(500).send({mensaje: 'error al guardar Hotel'})
                    
                    return res.status(200).send({hotel: hotelRegistrado})

                })
            })
        }else{
            return res.status(500).send({mensaje: 'EL Correo de este hotel ya se Encuentra Registrado'})
        }
    })




    
}

function obtenerHoteles(req, res){

    modeloUsuario.find({rol: 'AdminDeHotel'},(err, listadoHoteles)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'})
        if(!listadoHoteles) return res.status(500).send({mensaje: 'error al obtener los hoteles'})

        return res.status(200).send({hoteles: listadoHoteles})
    })
}

function obtenerHotelID(req, res){

    var idhotel = req.params.idhotel

    modeloUsuario.findOne({_id: idhotel},(err, hotelEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'})
        if(!hotelEncontrado) return res.status(500).send({mensaje: 'error al encontrar hotel'})

        return res.status(200).send({ hotel: hotelEncontrado})
    })

}

module.exports = {

    obtenerUsuarios,
    agregarHotel,
    obtenerHoteles,
    obtenerHotelID
}