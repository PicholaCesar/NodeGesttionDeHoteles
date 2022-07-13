const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const modeloEventos = new Schema({

    nombreEvento: String,
    descripcion: String,
    fecha: String,
    hora: String,
    idCreador: {type: Schema.Types.ObjectId, ref: 'Usuarios'}
})

module.exports = mongoose.model('Eventos', modeloEventos)
    
