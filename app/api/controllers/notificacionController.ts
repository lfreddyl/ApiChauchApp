import mongoose from "mongoose";
import { interfaceNotificaciones } from "../interfaces/interfaces";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../responses/responseServices";
import { Request, Response } from "express";
import servicioNotificaciones from "../services/servicioNotificaciones";
import * as nodemailer from "nodemailer";

export class notificacionController {
  private servicioNotificaciones: servicioNotificaciones = new servicioNotificaciones();

  public createNotificacion(req: Request, res: Response) {
    // this check whether all the filds were send through the erquest or not
    if (
      req.body.descripcion &&
      req.body.fecha &&
      req.body.tipo &&
      req.body.id_usuario &&
      req.body.id_publicacion
    ) {
      const user_params: interfaceNotificaciones = {
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        leido: false,
        tipo: req.body.tipo,
        id_usuario: req.body.id_usuario,
        id_publicacion: req.body.id_publicacion,
      };
      this.servicioNotificaciones.createNotificaciones(
        user_params,
        (err: any, notificacionData: interfaceNotificaciones) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(
              "Registro creado exitosamente",
              notificacionData,
              res
            );
          }
        }
      );
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
    }
  }

  public getNotificacion(req: Request, res: Response) {
    if (req.params.id) {
      const query = { _id: req.params.id };
      this.servicioNotificaciones.filterNotificaciones(
        query,
        (err: any, notificacionData: interfaceNotificaciones) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("Registro encontrado exitosamente", notificacionData, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public getAllNotificaciones( res: Response) {
    
      const query = { };
      const queryagregate = [
        { $match: query },
        {
          $sort: { "fecha": 1 },
        },
      ];
      this.servicioNotificaciones.filterNotificacionesAgregate(
        queryagregate,
        (err: any, notificacionData: interfaceNotificaciones) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("Registros encontrados exitosamente", notificacionData, res);
          }
        }
      );
  }

  public updateNotificaciones(req: Request, res: Response) {
    if (
        req.body.descripcion &&
        req.body.fecha &&
        req.body.tipo &&
        req.body.id_usuario &&
        req.body.id_publicacion
    ) {
      const user_filter = { _id: req.params.id };
      this.servicioNotificaciones.filterNotificaciones(
        user_filter,
        (err: any, notificacionData: interfaceNotificaciones) => {
          if (err) {
            mongoError(err, res);
          } else if (notificacionData) {
            const paramsNotificaciones: interfaceNotificaciones = {
              _id: req.params.id,
              descripcion: req.body.descripcion
                ? req.body.descripcion
                : notificacionData.descripcion,
              fecha: req.body.fecha
                ? req.body.fecha
                : notificacionData.fecha,
              tipo: req.body.tipo
                ? req.body.tipo
                : notificacionData.tipo,
              id_usuario: req.body.id_usuario
                ? req.body.id_usuario
                : notificacionData.id_usuario,
              id_publicacion: req.body.id_publicacion
                ? req.body.id_publicacion
                : notificacionData.id_publicacion,
                leido: req.body.leido
                ? req.body.leido
                : notificacionData.leido,
            };
            this.servicioNotificaciones.updateNotificaciones(paramsNotificaciones, (err: any) => {
              if (err) {
                mongoError(err, res);
              } else {
                successResponse("Registro actualizado correctamente", null, res);
              }
            });
          } else {
            failureResponse("invalid notificacion", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public deleteNotificaciones(req: Request, res: Response) {
    if (req.params.id) {
      this.servicioNotificaciones.deleteNotificaciones(
        req.params.id,
        (err: any, delete_details: any) => {
          if (err) {
            mongoError(err, res);
          } else if (delete_details.deletedCount !== 0) {
            successResponse("Registro eliminado correctamente", null, res);
          } else {
            failureResponse("invalid notificacion", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
}
