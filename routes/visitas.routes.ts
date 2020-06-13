import { Router, Request, Response } from 'express';

import { app } from './router';
import * as _ from 'underscore';

import VisitasSchema from '../models/visitas.model';
import { MongoError } from 'mongodb';


app.get('/visitas', (req: Request, res: Response) => {
    VisitasSchema.find()
        .sort({ fecha: 1 })
        .populate('gym')
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

app.get('/visitas/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    VisitasSchema.findById(id)
        .populate('usuario')
        .populate('gym')
        .sort({ fecha: 1 })
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

app.post('/visitas', (req: Request, res: Response) => {
    let body = req.body;

    let values = new VisitasSchema({
        gym: body.gym,
        usuario: body.usuario,
        fecha: new Date().toISOString().toString(),
    });

    VisitasSchema.create(values, (err: MongoError, data: any) => {
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

export default app;