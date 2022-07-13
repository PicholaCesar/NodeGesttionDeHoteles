const express = require('express')
const controladorAdminAPP = require('../controllers/adminAPP.controller')

const api = express.Router();

const md_autenticacion = require('../middlewares/autenticacion')
const md_rol = require('../middlewares/roles')

api.get('/obtenerUsurios', [md_autenticacion.Auth, md_rol.AdminDeApp], controladorAdminAPP.obtenerUsuarios )
api.post('/agregarhotel',[md_autenticacion.Auth], controladorAdminAPP.agregarHotel) 
api.get('/obtenerhotel', controladorAdminAPP.obtenerHoteles)
api.get('/obtehotel/:idhotel', controladorAdminAPP.obtenerHotelID)

module.exports = api;
