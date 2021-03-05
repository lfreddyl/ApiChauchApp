import { Router, Request, Response, Application } from 'express';
import { userController } from '../app/api/controllers/userController';
import { _userController } from '../app/api/controllers/_userController';

//Importamos todos los controladores

export class router {

    public _userController: _userController = new _userController();
    public route(app: Application) {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })


            })

        //Definimos las rutas de los controladores
        app.route('/createuser')
            .post((req: Request, res: Response) => {
                this._userController._create_user(req, res)
            })


        app.route('/getusers/')
            .get((req: Request, res: Response) => {
                this._userController.get_users(res);

            })

        app.route('/deleteuser/:_id')
            .delete((req: Request, res: Response) => {
                this._userController.delete_user(req, res);

            })
        app.route('/updateuser/:_id')
            .put((req: Request, res: Response) => {
                this._userController.update_user(req, res);

            })

        app.route('/usersByEmail/:correo')

            .get((req: Request, res: Response) => {
                this._userController.findUserEmail(req, res);

            })

        app.route('/usersByTelephone/:telefono')

            .get((req: Request, res: Response) => {
                this._userController.findUserTelephone(req, res);

            })

    }
}