import { Router, Request,Response, Application} from 'express';
import {publicacionController} from '../app/api/controllers/servicesController';
//Importamos todos los controladores

export class router{
    public publicacionController:publicacionController= new publicacionController();

    public route(app: Application){

        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
    
         
        })
        
        //Definimos las rutas de los controladores

        app.route('/publicacionesByEstado/:estado')
        .get((req: Request, res: Response) => {
            this.publicacionController.find_publicacionByEstado(req,res);
        })
                
        app.route('/publicacionesByUser/:idUser')
        .get((req: Request, res: Response) => {
            this.publicacionController.get_PublicacionByUser(req,res);
        })
        app.route('/publicacionesByDescripcion/:cadenaBusqueda')
        .get((req: Request, res: Response) => {
            this.publicacionController.get_PublicacionByDescripcion(req,res);
        })
        app.route('/publicacionesByCategoria/:cadenaBusqueda')
        .get((req: Request, res: Response) => {
            this.publicacionController.get_PublicacionByCategoria(req,res);
        })

        app.route('/publicacioness/:page')
        .get((req: Request, res: Response) => {
            this.publicacionController.get_AllPublicacion(req,res);
        })
        app.route('/publicacionesCount')
        .get((req: Request, res: Response) => {
            this.publicacionController.countPublicacion(req,res);
        })
        app.route('/publicaciones')
        .post((req: Request, res: Response) => {
            this.publicacionController.create_publicacion(req,res);
    
        })

        app.route('/publicaciones')
        .get((req: Request, res: Response) => {
            this.publicacionController.getPublicacion(req,res);
    
        })

        app.route('/publicaciones/:id')
        .get((req: Request, res: Response) => {
            this.publicacionController.get_publicacion(req,res);
    
        })
        .put((req: Request, res: Response) => {
            this.publicacionController.update_publicacion(req,res);
    
        })
        .delete((req: Request, res: Response) => {
            this.publicacionController.delete_publicacion(req,res);
    
        });
       
    }
}
