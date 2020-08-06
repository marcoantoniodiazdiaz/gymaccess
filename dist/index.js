"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// Rutas
const router_1 = __importDefault(require("./routes/router"));
const counter_routes_1 = __importDefault(require("./routes/counter.routes"));
const gym_routes_1 = __importDefault(require("./routes/gym.routes"));
const uploads_routes_1 = __importDefault(require("./routes/uploads.routes"));
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const clases_routes_1 = __importDefault(require("./routes/clases.routes"));
const imagenes_routes_1 = __importDefault(require("./routes/imagenes.routes"));
const planes_routes_1 = __importDefault(require("./routes/planes.routes"));
const visitas_routes_1 = __importDefault(require("./routes/visitas.routes"));
const contratos_routes_1 = __importDefault(require("./routes/contratos.routes"));
const resenas_routes_1 = __importDefault(require("./routes/resenas.routes"));
const reservaciones_routes_1 = __importDefault(require("./routes/reservaciones.routes"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server = server_1.default.instance;
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FRONTEND
// server.app.use(express.static('public'));
// CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de MongoDB
server.app.use('/', (express_1.default.static('public', { redirect: false })));
server.app.use('/api', router_1.default);
server.app.use('/api', counter_routes_1.default);
server.app.use('/api', clases_routes_1.default);
server.app.use('/api', imagenes_routes_1.default);
server.app.use('/api', planes_routes_1.default);
server.app.use('/api', visitas_routes_1.default);
server.app.use('/api', gym_routes_1.default);
server.app.use('/api', usuarios_routes_1.default);
server.app.use('/api', uploads_routes_1.default);
server.app.use('/api', contratos_routes_1.default);
server.app.use('/api', login_routes_1.default);
server.app.use('/api', reservaciones_routes_1.default);
server.app.use('/api', resenas_routes_1.default);
server.app.get('*', (req, res, next) => {
    res.sendFile(path_1.default.resolve('public/index.html'));
});
// MySQL.instance;
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
