import { Router, Request, Response } from 'express';

import { app } from './router';
import * as _ from 'underscore';

import PlanesSchema from '../models/planes.model';
import { MongoError } from 'mongodb';


app.get('/planes', (req: Request, res: Response) => {
    PlanesSchema.find()
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

app.get('/planes/limitados/:limitado', (req: Request, res: Response) => {
    const limitado = req.params.limitado;
    PlanesSchema.find({
        limitado,
    })
        .sort({
            precio: 1,
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

app.get('/planes/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    PlanesSchema.findById(id)
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

app.post('/planes', (req: Request, res: Response) => {
    let body = req.body;

    let values = new PlanesSchema({
        nombre: body.nombre,
        limitado: body.limitado,
        descripcion: body.descripcion,
        precio: body.precio,
        visitas: body.visitas,
    });

    PlanesSchema.create(values, (err: MongoError, data: any) => {
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

app.put('/planes/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'limitado',
        'descripcion',
        'precio',
        'visitas'
    ]);

    PlanesSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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