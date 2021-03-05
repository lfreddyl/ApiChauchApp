export interface interfaceServicio {
    _id?: String,
    nombre: String,
    categoria: Array<String>,
    descripcion:String,
    precio?:Number,
    disponibilidad?: Boolean,
    direccion: {
        provincia:String,
        ciudad:String,
        calles:string,
    },
    fecha?: Date,
    id_usuario?: String
}