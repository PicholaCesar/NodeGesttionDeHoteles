const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarusuario', usuarioControlador.RegistrarUsuario);
api.post('/login', usuarioControlador.Login);
api.put('/editarUsuario', md_autenticacion.Auth, usuarioControlador.EditarUsuario);
api.get('/obtenerperfil',[md_autenticacion.Auth], usuarioControlador.obtenermiperfin)
api.delete('/eliminarperfil/:iduser', usuarioControlador.eliminarCuenta)

module.exports = api;