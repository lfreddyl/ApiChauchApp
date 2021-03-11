import { Router, Request,Response, Application} from 'express';
import { comentarioController } from '../app/api/controllers/comentarioController';

//Importamos todos los controladores

export class router{
    public comentarioController:comentarioController=new comentarioController();

    public route(app: Application){

        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
    
         
        })
        
        //Definimos las rutas de los controladores

        app.route('/createComentario')
            .post((req: Request, res: Response) => {
                this.comentarioController.createComentario(req, res)
            })


        app.route('/comentarios')
        .get((req: Request, res: Response) => {
            this.comentarioController.comentarios(res)
        })

        app.route('/getComentario/:_id')
        .get((req: Request, res: Response) => {
            this.comentarioController.getComentario(req,res)
        })
        
        app.route('/deleteComentario/:_id')
            .delete((req: Request, res: Response) => {
                this.comentarioController.deleteComentario(req, res);

            })

        app.route('/updateComentario/:_id')
        .put((req: Request, res: Response) => {
            this.comentarioController.updateComentario(req,res);
    
        })

        app.route('/getComentariosPorPublicacion/:id_publicacion')
        .get((req: Request, res: Response) => {
            this.comentarioController.comentariosPorPublicacion(req,res);
    
        })
       
    }
}
