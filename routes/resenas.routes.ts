import { Router, Request, Response } from 'express';

import { app } from './router';
import * as _ from 'underscore';

import ResenasSchema from '../models/resenas.model';
import { MongoError } from 'mongodb';


app.get('/resenas', (req: Request, res: Response) => {
    ResenasSchema.find()
        .populate('usuario')
        .populate('gym')
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

app.get('/resenas/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ResenasSchema.findById(id)
        .populate('usuario')
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

app.post('/resenas', (req: Request, res: Response) => {
    let body = req.body;

    let values = new ResenasSchema({
        usuario: body.usuario,
        descripcion: body.descripcion,
        calificacion: body.calificacion,
    });

    ResenasSchema.create(values, (err: MongoError, data: any) => {
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

app.put('/resenas/:id', async (req: Request, res: Response) => {
    let id = req.params.id;

    let body = _.pick(req.body, [
        'descripcion',
        'calificacion',
    ]);

    ResenasSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data,
        });
    });
});

export default app;