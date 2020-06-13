import { Router, Request, Response } from 'express';

import { app } from './router';
import * as _ from 'underscore';

import ClasesSchema from '../models/clases.model';
import { MongoError } from 'mongodb';


app.get('/clases', (req: Request, res: Response) => {
    ClasesSchema.find().sort({ nombre: 1 }).exec((err, data) => {
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

app.get('/clases/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ClasesSchema.findById(id).sort({
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

app.post('/clases', (req: Request, res: Response) => {
    let body = req.body;

    let values = new ClasesSchema({
        nombre: body.nombre,
    });

    ClasesSchema.create(values, (err: MongoError, data: any) => {
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

app.put('/clases/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
    ]);

    ClasesSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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