
export interface interfaceUsuario {
            _id?: String,
            nombres: String,
            apellidos: String,
            correo:String,
            telefono?:String,
            direccion?: String,
            password: String,
            delete?: Boolean
            img?:String
            notificaciones?:Array<any>,
            notificacion_leido?:Boolean,
            mensaje_leido?:Boolean
            
}
 

export interface interfaceNotificaciones {
    _id?: String,
    descripcion:String,
    fecha:Date,
    id_usuario:String,
    id_publicacion:String,
    leido:Boolean,
    tipo:String
}












