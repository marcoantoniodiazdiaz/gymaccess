import { Router, Request, Response } from 'express';

import { app } from './router';

import GymsSchema from '../models/gyms.model';
import { MongoError } from 'mongodb';

import * as _ from 'underscore';

app.get('/gym', (req: Request, res: Response) => {
    GymsSchema.find().populate('clase').populate('latlong')
        .sort({ nombre: 1 }).exec((err, data) => {
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

app.get('/gym/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    GymsSchema.findById(id).sort({
        nombre: 1
    }).exec((err, data) => {
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

app.post('/gym', (req: Request, res: Response) => {
    let body = req.body;

    let product = new GymsSchema({
        direccion: body.direccion,
        logo: body.logo,
        nombre: body.nombre,
        clase: body.clase,
        descripcion: body.descripcion,
        telefono: body.telefono,
        latlong: body.latlong,
    });

    GymsSchema.create(product, (err: MongoError, data: any) => {
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

app.put('/gym/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'direccion',
        'logo',
        'nombre',
        'clase',
        'descripcion',
        'telefono',
        'latlong',
    ]);

    GymsSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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