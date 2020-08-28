import { Request, Response } from 'express';

import { app } from './router';

import ArchivosSchema from '../models/archivos.model';
// import ArchivosSchema from '../models/archivoss.model';

import { MongoError } from 'mongodb';

import * as _ from 'underscore';

app.get('/archivos', (req: Request, res: Response) => {

    ArchivosSchema.find({ active: true })
        .sort({ fecha: -1 })
        .exec((err, data: any) => {
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

app.get('/archivos/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ArchivosSchema.findById(id).sort({
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

app.get('/archivos/tipo/:tipo', (req: Request, res: Response) => {
    const tipo = req.params.tipo;

    ArchivosSchema.find({ tipo }).sort({
        fecha: -1
    }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        console.log(data);

        res.json({
            ok: true,
            data
        });
    });
});

app.post('/archivos', (req: Request, res: Response) => {
    let body = req.body;

    let product = new ArchivosSchema({
        nombre: body.nombre,
        url: body.url,
        tipo: body.tipo,
        fecha: new Date().toISOString(),
    });

    ArchivosSchema.create(product, (err: MongoError, data: any) => {
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

app.put('/archivos/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'url',
        'tipo',
        'active',
    ]);

    ArchivosSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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

app.delete('/archivos/:id', (req: Request, res: Response) => {
    let id = req.params.id;

    ArchivosSchema.findByIdAndUpdate(id, { active: false }, { new: true, runValidators: true }, (err, data) => {
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