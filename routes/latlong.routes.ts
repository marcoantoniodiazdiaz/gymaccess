import { Router, Request, Response } from 'express';

import { app } from './router';
import bcrypt from 'bcrypt';
import * as _ from 'underscore';

import LatLongSchema from '../models/latlong.model';
import { MongoError } from 'mongodb';


app.get('/latlong', (req: Request, res: Response) => {
    LatLongSchema.find().sort({ nombre: 1 }).exec((err, data) => {
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

app.get('/latlong/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    LatLongSchema.findById(id).exec((err, data) => {
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

app.post('/latlong', (req: Request, res: Response) => {
    let body = req.body;

    let values = new LatLongSchema({
        lat: body.lat,
        lon: body.lon,
    });

    LatLongSchema.create(values, (err: MongoError, data: any) => {
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

app.put('/latlong/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'lat',
        'lon',
    ]);

    LatLongSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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