const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Habitaciones = new Schema({

    NombreHabitacion:String,
    precio: Number,
    estado: Boolean,
    idCreador: {type: Schema.Types.ObjectId, ref: 'Usuarios'}
})

module.exports = mongoose.model('habitaciones', Habitaciones)