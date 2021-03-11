import {interfaceComentario} from '../interfaces/comentario';
import{comentarioSchema} from '../models/Comentario';
import mongoose from 'mongoose';

const comentarios=mongoose.model('comentarios',comentarioSchema);

export default class servicioComentarios
{
    public creteComentario(comentario_params: interfaceComentario, callback: any) {
        const _sesion = new comentarios(comentario_params);
        _sesion.save(callback);
    }

    public getComentario(callback: any) {
        comentarios.find({}, callback);
    }

    public filterComentario(query: any, callback: any) {
        comentarios.findOne(query, callback);
    }
    public filterComentariosAll(query: any, callback: any) {
        comentarios.find(query, callback);
    }

    public filterComentarioAgregate(query: any, callback: any) {
        comentarios.aggregate(query).exec(callback);
    }

    public updateComentario(comentario_params: interfaceComentario, callback: any) {
        const query = { _id: comentario_params._id };
        comentarios.findOneAndUpdate(query, comentario_params, callback);
    }

    public deleteComentario(_id: String, callback: any) {
        const query = { _id: _id };
        comentarios.deleteOne(query, callback);
    }

    public filterByPublicacion(query: any,queryOrder: any,callback:any) {
          comentarios.aggregate(query).sort(queryOrder).exec(callback);
          
    }
}