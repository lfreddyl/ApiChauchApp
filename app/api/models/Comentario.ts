import mongoose from "mongoose";

const Schema=mongoose.Schema;

export const comentarioSchema=new Schema(
    {
        descripcion:{
            type:String,
            required:'La descripcion es requerida'
        },

        fecha_comentario:{
            type:Date,
            required:'La fecha es requerida'
        },
        
        estado: {
            type: Boolean,
            required: 'El estado es requerido',
            default: true
        },

        id_usuario:{
            type:Schema.Types.ObjectId, ref:'_usuarios', required:'El id del usuario es requerido'
        },
        id_publicacion:{
            type:Schema.Types.ObjectId, ref:'publicaciones', required:'El id de la publicacion es requerido'
        },
    },{ versionKey: false, timestamps:true, }
)