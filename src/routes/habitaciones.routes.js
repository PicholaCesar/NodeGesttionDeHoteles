const express = require('express')
const controlador = require('../controllers/habitaciones.controller')


const api = express.Router();

const md_autenticacion = require('../middlewares/autenticacion')
const md_rol = require('../middlewares/roles')

api.post('/agregarhabitacion',md_autenticacion.Auth, controlador.agregarHabitaciones)
api.post('/reserva', md_autenticacion.Auth, controlador.reservas)
api.get('/listarhabitacion/:idHotel', controlador.listarHabitaciones)
api.get('/reservaciones', [md_autenticacion.Auth], controlador.listadodeRecervaciones)
api.post('/agregarevento',[md_autenticacion.Auth], controlador.agregarEventos)
api.get('/listareventos/:idhotel', controlador.listarEventos)


api.get('/mireservacion',md_autenticacion.Auth, controlador.obtenermirecervacion)

api.put('/cancelarReservacion/:nombre', controlador.cancelarReservacion)

api.get('/factura/:nombre',controlador.Factura)

api.all('/reservageneral', controlador.reservacionGenera)

module.exports = api;
