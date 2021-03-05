import mongoose from 'mongoose'
import {notificacionesSchema} from '../models/Notificaciones'
import {interfaceNotificaciones} from'../interfaces/interfaces'

const notificaciones= mongoose.model('notificaciones',notificacionesSchema);

export default class notificacionesService{
    public createNotificaciones(user_params: interfaceNotificaciones, callback: any) {
        const _session = new notificaciones(user_params);
        _session.save(callback);
    }

    public getNotificaciones(callback: any) {
        notificaciones.find({}, callback);
    }
    public filterNotificaciones(query: any, callback: any) {
        notificaciones.findOne(query, callback);
    }
    public filterNotificacionesAll(query: any, callback: any) {
        notificaciones.find(query, callback);
    }
    
    public filterNotificacionesAgregate(query: any, callback: any) {
        notificaciones.aggregate(query).exec(callback);
    }

    public updateNotificaciones(user_params: interfaceNotificaciones, callback: any) {
        const query = { _id: user_params._id };
        notificaciones.findOneAndUpdate(query, user_params, callback);
    }
    
    public deleteNotificaciones(_id: String, callback: any) {
        const query = { _id: _id };
        notificaciones.deleteOne(query, callback);
    }


}

