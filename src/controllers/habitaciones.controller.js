const habitaciones = require('../models/habitaciones.models')
const reserva = require('../models/reservar.model')
const usuario = require('../models/usuario.model')
const eventos = require('../models/eventos.model')
const pdfkit = require('pdfkit');
const fs = require('fs');

function agregarHabitaciones (req, res){

    var parametros = req.body;
    var modelHabitaciones = new habitaciones();

   modelHabitaciones.NombreHabitacion = parametros.NombreHabitacion;
   modelHabitaciones.precio = parametros.precio;
   modelHabitaciones.estado = true;
   modelHabitaciones.idCreador = req.user.sub;

   modelHabitaciones.save((err, habitacionAgregada)=>{
      if(err) return res.status(200).send({mensaje: 'error en la peticion'})
      if(!habitacionAgregada) return res.status(200).send({mensaje: 'error al guardar la habitacion'})
      
      return res.status(200).send({habitacion: habitacionAgregada })
   })
}

function reservas(req, res){

    var parametros = req.body;
    var modeloReserva = new reserva();



    modeloReserva.nombreHotel = parametros.nombreHotel
    modeloReserva.nombreUsuario = req.user.nombre
    modeloReserva.fechaReserva = parametros.fechaReserva
    modeloReserva.hora = parametros.hora
    modeloReserva.cuarto = parametros.cuarto
    var totales = parseInt(parametros.hora)
    var resultado = totales*50

    modeloReserva.total = resultado
    modeloReserva.idCreador = req.user.sub

    modeloReserva.save((err, reservaGuardada)=>{
        if(err) return res.status(200).send({mensaje: 'error en la peticion'})
        if(!reservaGuardada) return res.status(200).send({mensaje: 'error al guardar reserva'})

        habitaciones.updateMany({NombreHabitacion: parametros.cuarto},{estado: false},(err, habitacionActualizada)=>{
            if(err) return res.status(200).send({mensaje: 'error en la peticion'})
            return res.status(200).send({habitacion: habitacionActualizada})

        
        })

    })

}

function cancelarReservacion(req,res){

    var parametros = req.params.nombre
    habitaciones.updateMany({NombreHabitacion: parametros},{estado: true},(err, habitacionActualizada)=>{
        if(err) return res.status(200).send({mensaje: 'error en la peticion'})
        return res.status(200).send({habitacion: habitacionActualizada})

    
    })
    
}

function obtenermirecervacion(req, res){

    reserva.find({idCreador: req.user.sub},(err, mireservacion)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'})
        if(!mireservacion) return res.status(500).send({mensaje: 'no hay reservacion'})

        return res.status(200).send({mireservacion: mireservacion})
    })
}


function listadodeRecervaciones(req, res){

 reserva.find({nombreHotel: req.user.nombre},(err, reservaciones)=>{
      if(err) return res.status(500).send({mensaje: 'error en la peticion'})
      if(!reservaciones) return res.status(500).send({mensaje: 'no se concotro reservaciones'})

      return res.status(200).send({reservacion: reservaciones})
 })

}


function listarHabitaciones(req, res){
     var idHotel = req.params.idHotel
     
     habitaciones.find({idCreador: idHotel},(err, habitacioneslist)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'})
        if(!habitacioneslist) return res.status(500).send({mensaje:'no se obtuno ninguna hbitacion'})



        return res.status(200).send({habitacion: habitacioneslist})

     })
}

function agregarEventos(req, res){

    var parametros = req.body;
    var modeloEvento = new eventos();


    modeloEvento.nombreEvento = parametros.nombreEvento
    modeloEvento.descripcion = parametros.descripcion
    modeloEvento.fecha = parametros.fecha
    modeloEvento.hora = parametros.hora
    modeloEvento.idCreador = req.user.sub

    modeloEvento.save((err, eventoGuardado)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'})
        if(!eventoGuardado) return res.status(500).send({mensaje: 'error al guradar el evento'})

        return res.status(200).send({evento: eventoGuardado})
    })

}


function listarEventos(req, res){

      var idHotel = req.params.idhotel
    eventos.find({idCreador: idHotel},(err, evetosEncontrados)=>{

        if(err) return res.status(500).send({mensaje: 'error en la peticion'})
        if(!evetosEncontrados) return res.status(500).send({mensaje: 'no se encotro ningun hotel'})

        return res.status(200).send({eventos: evetosEncontrados})
    })
}


function Factura(req, res){
    const pdfDocument = new pdfkit
    pdfDocument.pipe(fs.createWriteStream("factura.pdf"));


    var parametros = req.params.nombre
    reserva.find({cuarto: parametros},(err, reser)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'})
        if(!reser) return res.status(500).send({mensaje: 'no hay reservacion'})

        let contenido =[]
        for(let i = 0; i< reser.length; i++){

            contenido.push(reser[i].nombreHotel+'                                 '+ 
            reser[i].cuarto+'                       '+ 
            reser[i].hora+'                          '+  
            reser[i].total+'\n'+'\n'+'\n')
        } 
        pdfDocument.text("FATURA",{
            align: 'center',
        })
  
          pdfDocument.text("NOMBRE HOTEL          CUARTO                HORA                   TOTAL ",{
            //align: 'center',
        })
  
        pdfDocument.text("     "+'\n'+'\n',{
          align: 'center',
      })
  
        pdfDocument.text(contenido,{
          //align: 'center',
          fit: [250,300], 
     
      })

  
      pdfDocument.end()
        
    })
}

function reservacionGenera(req, res){

    reserva.find({}, (err, listado)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'})
        if(!listado) return res.status(500).send({mensaje: 'no hay listado'})

        return res.status(200).send({listado: listado})
    })
}


module.exports = {
    agregarHabitaciones, 
     reservas,
     listarHabitaciones,
     listadodeRecervaciones,
     agregarEventos,
     listarEventos,
     obtenermirecervacion,
     cancelarReservacion,
     Factura,
     reservacionGenera

}