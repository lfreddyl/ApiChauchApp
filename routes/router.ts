import { Router, Request,Response, Application} from 'express';

//Importamos todos los controladores

export class router{

    public route(app: Application){

        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
    
         
        })
        
        //Definimos las rutas de los controladores

        
       
    }
}
