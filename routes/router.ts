import { Router, Request,Response, Application} from 'express';
import {notificacionController} from'../app/api/controllers/notificacionController'
//Importamos todos los controladores

export class router{

    public notificacionController:notificacionController = new notificacionController()
    public route(app: Application){

        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
    
         
        })
        
        //Definimos las rutas de los controladores

        app.route('/notificaciones')
        .get((req: Request, res: Response) => {
            this.notificacionController.getAllNotificaciones(res);
        })
        .post((req: Request, res: Response) => {
            this.notificacionController.createNotificacion(req,res);
    
        })

        app.route('/notificaciones/:id')
        .get((req: Request, res: Response) => {
            this.notificacionController.getNotificacion(req,res);
    
        })
        .put((req: Request, res: Response) => {
            this.notificacionController.updateNotificaciones(req,res);
    
        })
        .delete((req: Request, res: Response) => {
            this.notificacionController.deleteNotificaciones(req,res);
    
        });
       
    }
}
