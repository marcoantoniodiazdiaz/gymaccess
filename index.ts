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
import reservaciones from './routes/reservaciones.routes';
import express from 'express';
import path from 'path';


const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// FRONTEND
// server.app.use(express.static('public'));

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de MongoDB
server.app.use('/', (express.static('public', { redirect: false })));
server.app.use('/api', router);
server.app.use('/api', counter);
server.app.use('/api', clases);
server.app.use('/api', imagenes);
server.app.use('/api', planes);
server.app.use('/api', visitas);
server.app.use('/api', gym);
server.app.use('/api', usuarios);
server.app.use('/api', uploads);
server.app.use('/api', contratos);
server.app.use('/api', login);
server.app.use('/api', reservaciones);
server.app.get('*', (req, res, next) => {
  res.sendFile(path.resolve('public/index.html'));
});

// MySQL.instance;

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${server.port}`);
});
