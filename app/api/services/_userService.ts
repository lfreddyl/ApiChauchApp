import { _interfaceUsuario } from '../interfaces/user';
import { _UserShema } from '../models/_User';
import mongoose from 'mongoose';

const _users = mongoose.model('_usuarios', _UserShema);

export default class _userService {

    public creteUser(user_params: _interfaceUsuario, callback: any) {
        const _sesion = new _users(user_params);
        _sesion.save(callback);
    }

    public getUser(callback: any) {
        _users.find({}, callback);
    }

    public filterUser(query: any, callback: any) {
        _users.findOne(query, callback);
    }
    public filterUserAll(query: any, callback: any) {
        _users.find(query, callback);
    }

    public filterUserAgregate(query: any, callback: any) {
        _users.aggregate(query).exec(callback);
    }

    public updateUser(user_params: _interfaceUsuario, callback: any) {
        const query = { _id: user_params._id_usuario };
        _users.findOneAndUpdate(query, user_params, callback);
    }

    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        _users.deleteOne(query, callback);
    }
}