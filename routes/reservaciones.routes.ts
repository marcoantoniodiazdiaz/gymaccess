import { Request, Response } from 'express';

import { app } from './router';
import * as _ from 'underscore';

import ReservacionesSchema from '../models/reservaciones.model';

import { MongoError } from 'mongodb';

// import {
//     verificaToken,
//     verificaAdmin_Role
// } from '../middlewares/authentication';


app.get('/reservaciones', /*[verificaToken],*/(req: Request, res: Response) => {
    ReservacionesSchema.find({ active: true })
        .populate('usuario')
        .populate({
            path: 'gym',
            populate: ['resenas', 'clase'],
        })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                data: data,
            });
        });
});

app.get('/reservaciones/:id', /*[verificaToken],*/(req: Request, res: Response) => {
    const id = req.params.id;

    ReservacionesSchema.findById(id, { active: true })
        .populate('usuario')
        .populate({
            path: 'gym',
            populate: ['resenas', 'clase'],
        })
        .exec((err, data) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                data
            });
        });
});

app.get('/reservaciones/usuario/:id',/* [verificaToken],*/(req: Request, res: Response) => {
    const id = req.params.id;

    ReservacionesSchema.find({ usuario: id, active: true })
        .populate('usuario')
        .populate({
            path: 'gym',
            populate: ['clase', 'resenas'],
        })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                data
            });
        });
});

app.get('/reservaciones/gym/:id',/* [verificaToken],*/(req: Request, res: Response) => {
    const id = req.params.id;

    ReservacionesSchema.find({ gym: id, active: true })
        .populate('usuario')
        .populate({
            path: 'gym',
            populate: ['clase', 'resenas'],
        })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                data
            });
        });
});

app.post('/reservaciones', /*[verificaToken],*/ async (req: Request, res: Response) => {
    let body = req.body;

    let values = new ReservacionesSchema({
        fecha: new Date().toISOString(),
        usuario: body.usuario,
        gym: body.gym,
    });

    ReservacionesSchema.create(values, (err: MongoError, data: any) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            data
        });
    });
});

app.put('/reservaciones/:id', /*[verificaToken],*/(req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'active'
    ]);

    ReservacionesSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data: data
        });
    });
});

export default app;