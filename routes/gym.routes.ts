import { Router, Request, Response } from 'express';

import { app } from './router';

import GymsSchema from '../models/gyms.model';
// import GymsSchema from '../models/gyms.model';

import { MongoError } from 'mongodb';

import * as _ from 'underscore';
import bcrypt from 'bcrypt';

app.get('/gym', (req: Request, res: Response) => {

    GymsSchema.find({ active: true }).populate('clase')
        .populate('resenas').sort({ nombre: 1 }).exec((err, data: any) => {
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

app.get('/gym/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    GymsSchema.findById(id).populate('clase').sort({
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

app.get('/gym/nombre/:nombre', (req: Request, res: Response) => {
    const nombre = req.params.nombre;
    let regex = new RegExp(nombre);

    GymsSchema.find({
        nombre: {
            $regex: regex,
            $options: 'i'
        }
    }).populate('clase').sort({
        nombre: 1
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

app.post('/gym', (req: Request, res: Response) => {
    let body = req.body;

    body.password = bcrypt.hashSync(body.password, 10);

    let product = new GymsSchema({
        email: body.email,
        password: body.password,
        direccion: body.direccion,
        logo: body.logo,
        nombre: body.nombre,
        clase: body.clase,
        descripcion: body.descripcion,
        telefono: body.telefono,
        lat: body.lat,
        lon: body.lon,
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
        'password',
        'direccion',
        'logo',
        'nombre',
        'clase',
        'descripcion',
        'telefono',
        'lat',
        'lon',
        'open',
        'close',
        'openDay',
        'closeDay',
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

app.put('/gym/delete/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'active',
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