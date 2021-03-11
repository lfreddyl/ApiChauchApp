import mongoose from 'mongoose';
import {interfaceComentario} from '../interfaces/comentario';
import {
    insufficientParameters,
    mongoError,
    successResponse,
    failureResponse,
    sms_update,
    sms_create,
    sms_get,
    sms_notfound,
    sms_delet,
} from '../responses/responseServices';
import { Request, Response } from "express";
import servicioComentarios from '../services/servicioComentarios';
import * as nodemailer from 'nodemailer';

export class comentarioController
{
    private servicioComentario: servicioComentarios= new servicioComentarios();

    public createComentario(req: Request, res: Response) {

        
        if (
            req.body.descripcion &&
            req.body.fecha_comentario &&
            req.body.estado &&
            req.body.id_usuario &&
            req.body.id_publicacion    
        ) {
          const comentario_params: interfaceComentario = {
            descripcion: req.body.descripcion,
            fecha_comentario: req.body.fecha_comentario,
            estado: req.body.estado,
            id_usuario: req.body.id_usuario,
            id_publicacion: req.body.id_publicacion,
          };
          this.servicioComentario.creteComentario(
            comentario_params,
            (err: any, comentario_data: any) => {
              if (err) {
                mongoError(err, res);
              } else {
                successResponse("comentario agregado exitisamente", comentario_data, res);
              }
            }
          );
        } else {
          // error response if some fields are missing in request body
          insufficientParameters(res);
        }

        
      }
      public comentarios(res: Response) {
        this.servicioComentario.getComentario((err: any, comentario_data: interfaceComentario) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse(sms_get, comentario_data, res);
            }
        });
    }
    
    public getComentario(req: Request, res: Response) {
        if (req.params._id) {
            const comentario_filter = { _id: req.params._id };
            this.servicioComentario.filterComentario(
                comentario_filter,
                (err: any, cometario_data: interfaceComentario) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        successResponse("get comentario successfull", cometario_data, res);
                    }
                }
            );
        } else {
            insufficientParameters(res);
        }
    }

    public deleteComentario(req: Request, res: Response) {
        if (req.params._id) {
            this.servicioComentario.deleteComentario(
                req.params._id,
                (err: any, delete_details: any) => {
                    if (err) {
                        mongoError(err, res);
                    } else if (delete_details.deletedCount !== 0) {
                        successResponse(sms_delet, null, res);
                    } else {
                        failureResponse("invalid comentario", null, res);
                    }
                }
            );
        } else {
            insufficientParameters(res);
        }
    }


    public updateComentario(req: Request, res: Response) {
        if (req.body.descripcion &&
            req.body.fecha_comentario &&
            req.body.estado &&
            req.body.id_usuario &&
            req.body.id_publicacion 
        ) {
            const comentario_filter = { _id: req.params._id };
            this.servicioComentario.filterComentario(
                comentario_filter,
                (err: any, comentario_data: interfaceComentario) => {
                    if (err) {
                        mongoError(err, res);
                    } else if (comentario_data) {
                        const comentario_params: interfaceComentario = {
                            _id: req.params._id,
                            descripcion:req.body.descripcion ? req.body.descripcion:comentario_data.descripcion,
                            fecha_comentario:req.body.fecha_comentario ? req.body.fecha_comentario:comentario_data.fecha_comentario,
                            estado:req.body.estado ? req.body.estado:comentario_data.estado,
                            id_usuario:req.body.id_usuario ? req.body.id_usuario:comentario_data.id_usuario,
                            id_publicacion:req.body.id_publicacion ? req.body.id_publicacion:comentario_data.id_publicacion,
                            
                        };
                        this.servicioComentario.updateComentario(comentario_params, (err: any) => {
                            if (err) {
                                mongoError(err, res);
                            } else {
                                successResponse(sms_update, null, res);
                            }
                        });
                    } else {
                        failureResponse("error al actualizar el comentario", null, res);
                    }
                }
            );
        } else {
            insufficientParameters(res);
        }
    }


    public comentariosPorPublicacion(req: Request, res: Response) {
        if (req.params.id_publicacion) {
          const query = { id_publicacion: mongoose.Types.ObjectId(req.params.id_publicacion) };
          const order_filter = { fecha: -1 };
          const queryagregate = [
            {
              $lookup: {
                from: "publicaciones",
                localField: "id_publicacion",
                foreignField: "_id",
                as: "publicacion",
              },
            },
            { $unwind: "$publicacion" },
            { $match: query },

            {
                $lookup: {
                  from: "_usuarios",
                  localField: "id_usuario",
                  foreignField: "_id",
                  as: "usuario",
                },
            },
            { $unwind: "$usuario" },

            {
              $project: {
                _id: 1,
                descripcion: 1,
                fecha_comentario: 1,
                estado: 1,
                id_usuario: 1,

                nombres:"$usuario.nombres",
                apellidos:"$usuario.apellidos",
                correo:"$usuario.correo",
                img:"$usuario.img",
                id_us:"$usuario._id",

                descripcion_publicacion: "$publicacion.descripcion",
                nombre: "$publicacion.nombre",
                _id_publicacion: "$publicacion._id",
              },
            },

          ];
          this.servicioComentario.filterByPublicacion(
            queryagregate,
            order_filter,
            (err: any, comentarios_data: any) => {
              if (err) {
                mongoError(err, res);
              } else {
                successResponse(sms_get, comentarios_data, res);
              }
            }
          );
        } else {
          insufficientParameters(res);
        }
      }
}