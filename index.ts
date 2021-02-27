import Server from './classes/server';
import cors from 'cors';

const server= Server.instance;

server.app.use( cors({ origin: true, credentials: true }) );

server.start( ()=> {

console.log('Servidor en el puerto 5000')

});