
export interface _interfaceUsuario {
    _id?: String,
    nombres: String,
    apellidos: String,
    fecha_nacimiento: Date,
    correo: String,
    telefono: Array<String>,
    ubicacion: {
        provincia: String,
        ciudad: String,
        calles: String,
    },
    password: String,
    estado: Boolean,
    img: String,
    redes_sociales: {
        facebook: String,
        linkedin: String,
        instagram: String,
    },
    rating: Number
}

