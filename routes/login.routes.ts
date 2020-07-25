import { Router, Request, Response } from 'express';

import { app } from './router';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UsuariosSchema from '../models/usuarios.model';
import GymSchema from '../models/gyms.model';

app.post('/login', (req: Request, res: Response) => {

    let body = req.body;

    if (body.password === "" || body.email === "") {
        return res.status(400).json({
            ok: false,
            err: 'Los campos son invalidos'
        });
    }

    UsuariosSchema.findOne({ email: body.email }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: 'No hay ninguna cuenta asociada a este correo electronico'
            });
        }

        if (!bcrypt.compareSync(body.password, data.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La contraseña es incorrecta'
                }
            });
        }

        let token = jwt.sign(
            { data }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '60d' }
        );

        res.json({
            ok: true,
            data,
            token
        });
    });
});

app.post('/login/gym', (req: Request, res: Response) => {

    let body = req.body;

    if (body.password === "" || body.email === "") {
        return res.status(400).json({
            ok: false,
            err: 'Los campos son invalidos'
        });
    }

    GymSchema.findOne({ email: body.email }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: 'No hay ninguna cuenta asociada a este correo electronico'
            });
        }

        if (!bcrypt.compareSync(body.password, data.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La contraseña es incorrecta'
                }
            });
        }

        let token = jwt.sign(
            { data }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '60d' }
        );

        res.json({
            ok: true,
            data,
            token
        });
    });
});

export default app;