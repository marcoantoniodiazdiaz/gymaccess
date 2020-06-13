import { Router, Request, Response } from 'express';

import { app } from './router';
import * as _ from 'underscore';

import ContratosSchema from '../models/contratos.model';
import { MongoError } from 'mongodb';


app.get('/contratos', (req: Request, res: Response) => {
    ContratosSchema.find()
        .populate('usuario')
        .populate('gym')
        .populate('plan')
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

app.get('/contratos/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ContratosSchema.findById(id)
        .populate('usuario')
        .populate('gym')
        .populate('plan')
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

app.post('/contratos', (req: Request, res: Response) => {
    let body = req.body;

    let values = new ContratosSchema({
        gym: body.gym,
        usuario: body.usuario,
        plan: body.plan,
        fecha: new Date().toISOString().toString(),
    });

    ContratosSchema.create(values, (err: MongoError, data: any) => {
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