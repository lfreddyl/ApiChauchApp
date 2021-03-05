import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ServicioSchema = new Schema({
   
    nombre: {
        type: String,
        required:'El  nombre es requerido',
    },
    categoria: {
        type: Array,
        required:'La categoria es requerido',
    },
    descripcion: {
        type: String,
        required:'la descripcion es requerido',
        
    },
    precio: {
        type: Number,
        required:'el precio es requerido',
        
    },

    disponibilidad:{
        type:Boolean,
        default:true
    },
    direccion:{
        type:Object
    },
    fecha:{
        type: Date, default: Date.now()
    },

    //id_usuario:{type: Schema.Types.ObjectId,ref:"usuario", required:'El  user_id es requerido'},
    id_usuario:{type:String,default:'055454fred', required:'El  user_id es requerido'},


},{ versionKey: false, timestamps:true, });