import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';

// Rutas
import router from './routes/router';
import counter from './routes/counter.routes';
import gym from './routes/gym.routes';
import uploads from './routes/uploads.routes';
import usuarios from './routes/usuarios.routes';
import login from './routes/login.routes';
import clases from './routes/clases.routes';
import imagenes from './routes/imagenes.routes';
import planes from './routes/planes.routes';
import visitas from './routes/visitas.routes';
import contratos from './routes/contratos.routes';
import resenas from './routes/resenas.routes';
import reservaciones from './routes/reservaciones.routes';


const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// FRONTEND
// server.app.use(express.static('public'));

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de MongoDB
server.app.use('/', router);
server.app.use('/', counter);
server.app.use('/', clases);
server.app.use('/', imagenes);
server.app.use('/', planes);
server.app.use('/', visitas);
server.app.use('/', gym);
server.app.use('/', usuarios);
server.app.use('/', uploads);
server.app.use('/', contratos);
server.app.use('/', login);
server.app.use('/', reservaciones);
server.app.use('/', resenas);

// MySQL.instance;

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${server.port}`);
});
