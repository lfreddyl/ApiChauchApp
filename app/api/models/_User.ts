import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const _UserShema = new Schema({

    nombres: {
        type: String,
        required: 'Los nombres son requeridos'
    },
    apellidos: {
        type: String,
        required: 'Los apellidos son requeridos'
    },
    fecha_nacimiento: {
        type: Date,
        required: 'La fecha de nacimiento es requerida'
    },
    correo: {
        type: String,
        unique: true
    },
    telefono: {
        type: Array
    },
    ubicacion: {
        type: Object
    },
    password: {
        type: String,
        required: 'El password es requerido'
    },
    estado: {
        type: Boolean,
        required: 'El estado es requerido',
        default: true
    },
    img: {
        type: String
    },
    redes_sociales: {
        type: Object
    },
    rating: {
        type: Number,
        require: 'Es requerido'
    }
})