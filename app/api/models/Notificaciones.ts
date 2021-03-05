import moongose from 'mongoose'

const Schema= moongose.Schema

export const notificacionesSchema= new Schema({
    _id: {
        type:String,
        required:'El id es requerido',
    },
    descripcion:{
        type:String,
        required:'La descripcion es requerida'
    },
    fecha:{
        type:Date,
        required:'La fecha es requerida'
    },
    tipo:{
        type:String,
        required:'El tipo es requerido'
    },
   
   leido:{
       type:Boolean,
       required:'El valor de leido es requerido'
   } , 
    id_usuario:{
        type:Schema.Types.ObjectId, ref:'usuarios', required:'El id del usuario es requerido'
    },
    id_publicacion:{
        type:Schema.Types.ObjectId, ref:'publicaciones', required:'El id de la publicacion es requerido'
    }
})