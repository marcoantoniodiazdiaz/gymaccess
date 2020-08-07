import { Router, Request, Response } from 'express';

import { app } from './router';
import * as _ from 'underscore';

import ImagenesSchema from '../models/imagenes.model';
import { MongoError } from 'mongodb';


app.get('/imagenes/gym/:gym', (req: Request, res: Response) => {
    const gym = req.params.gym;
    ImagenesSchema.find({ gym })
        .populate({
            path: 'gym',
            populate: ['resenas', 'clase']
        })
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

app.get('/imagenes/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    ImagenesSchema.findById(id)
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

app.post('/imagenes', (req: Request, res: Response) => {
    let body = req.body;

    let values = new ImagenesSchema({
        usuario: body.usuario,
        gym: body.gym,
        url: body.url,
    });

    ImagenesSchema.create(values, (err: MongoError, data: any) => {
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

app.put('/imagenes/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'url',
    ]);

    ImagenesSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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

app.delete('/imagenes/:id', (req: Request, res: Response) => {
    let id = req.params.id;

    ImagenesSchema.findByIdAndRemove(id, (err, data) => {
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