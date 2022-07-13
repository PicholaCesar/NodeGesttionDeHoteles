const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const reservaciones = new Schema({

    nombreHotel: String,
    nombreUsuario: String,
    fechaReserva: String,
    hora: Number,
    cuarto: String,
    total:Number,
    idCreador: {type: Schema.Types.ObjectId, ref: 'Usuarios'}
})

module.exports = mongoose.model('reservas', reservaciones)