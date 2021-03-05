import mongoose from 'mongoose';
import { _interfaceUsuario } from '../interfaces/user';
import {
    insufficientParameters,
    mongoError,
    successResponse,
    failureResponse,
} from '../responses/responseServices';
import { Request, Response } from "express";
import _userService from '../services/_userService';
import * as nodemailer from 'nodemailer';

export class _userController {
    private _user_service: _userService = new _userService();

    public _create_user(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (
            (req.body.nombres &&
                req.body.apellidos &&
                req.body.fecha_nacimiento &&
                req.body.correo &&
                req.body.telefono &&
                req.body.ubicacion &&
                req.body.password &&
                req.body.estado &&
                req.body.img &&
                req.body.redes_sociales &&
                req.body.rating)
        ) {
            //Comprobar si el correo ya esta registrado
            //
            const user_filter = { correo: req.body.correo };
            this._user_service.filterUser(user_filter, (err: any, user_exits: any) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if (user_exits === null) {
                        const user_params: _interfaceUsuario = {
                            nombres: req.body.nombres,
                            apellidos: req.body.apellidos,
                            fecha_nacimiento: req.body.fecha_nacimiento,
                            correo: req.body.correo,
                            telefono: req.body.telefono,
                            ubicacion: req.body.ubicacion,
                            password: req.body.password,
                            estado: req.body.estado,
                            img: req.body.img,
                            redes_sociales: req.body.redes_sociales,
                            rating: req.body.rating,
                        };
                        this._user_service.creteUser(
                            user_params,
                            (err: any, user_data: _interfaceUsuario) => {
                                if (err) {
                                    mongoError(err, res);
                                } else {
                                    successResponse("create user successfull", user_data, res);
                                }
                            }
                        );
                    } else {
                        failureResponse(
                            "El correo ingresado ya se encuentra registrado",
                            null,
                            res
                        );
                    }
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_users(res: Response) {
        this._user_service.getUser((err: any, user_data: _interfaceUsuario) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse("get user successfull", user_data, res);
            }
        });
    }


    public get_user(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this._user_service.filterUser(
                user_filter,
                (err: any, user_data: _interfaceUsuario) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        successResponse("get user successfull", user_data, res);
                    }
                }
            );
        } else {
            insufficientParameters(res);
        }
    }


    public update_user(req: Request, res: Response) {
        if (req.body._id ||
            req.body.nombres ||
            req.body.apellidos ||
            req.body.fecha_nacimiento ||
            req.body.correo ||
            req.body.telefono ||
            req.body.ubicacion ||
            req.body.password ||
            req.body.estado ||
            req.body.img ||
            req.body.redes_sociales ||
            req.body.rating
        ) {
            const user_filter = { _id: req.params._id };
            this._user_service.filterUser(
                user_filter,
                (err: any, user_data: _interfaceUsuario) => {
                    if (err) {
                        mongoError(err, res);
                    } else if (user_data) {
                        const user_params: _interfaceUsuario = {

                            nombres: req.body.nombres ? req.body.nombres : user_data.nombres,
                            apellidos: req.body.apellidos ? req.body.apellidos : user_data.apellidos,
                            fecha_nacimiento: req.body.fecha_nacimiento ? req.body.fecha_nacimiento : user_data.fecha_nacimiento,
                            correo: req.body.correo ? req.body.correo : user_data.correo,
                            telefono: req.body.telefono ? req.body.telefono : user_data.telefono,
                            ubicacion: req.body.ubicacion ? req.body.ubicacion : user_data.ubicacion,
                            password: req.body.password ? req.body.password : user_data.password,
                            estado: req.body.estado ? req.body.estado : user_data.estado,
                            img: req.body.img ? req.body.img : user_data.img,
                            redes_sociales: req.body.redes_sociales ? req.body.redes_sociales : user_data.redes_sociales,
                            rating: req.body.rating ? req.body.rating : user_data.rating,

                        };
                        this._user_service.updateUser(user_params, (err: any) => {
                            if (err) {
                                mongoError(err, res);
                            } else {
                                successResponse("update user successfull", null, res);
                            }
                        });
                    } else {
                        failureResponse("invalid user", null, res);
                    }
                }
            );
        } else {
            insufficientParameters(res);
        }
    }


    public delete_user(req: Request, res: Response) {
        if (req.params._id) {
            this._user_service.deleteUser(
                req.params._id,
                (err: any, delete_details: any) => {
                    if (err) {
                        mongoError(err, res);
                    } else if (delete_details.deletedCount !== 0) {
                        successResponse("delete user successfull", null, res);
                    } else {
                        failureResponse("invalid user", null, res);
                    }
                }
            );
        } else {
            insufficientParameters(res);
        }
    }


    public findUserEmail(req: Request, res: Response) {
        if (req.params.correo) {
            const user_filter = { rating: req.params.correo };
            this._user_service.filterUser(
                user_filter,
                (err: any, user_data: _interfaceUsuario) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        successResponse("get user successfull", user_data, res);
                    }
                }
            );
        } else {
            insufficientParameters(res);
        }
    }

    public findUserTelephone(req: Request, res: Response) {
        if (req.params.telefono) {
            const user_filter = { telefono: req.params.telefono };
            this._user_service.filterUser(
                user_filter,
                (err: any, user_data: _interfaceUsuario) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        successResponse("get user successfull", user_data, res);
                    }
                }
            );
        } else {
            insufficientParameters(res);
        }
    }
}
