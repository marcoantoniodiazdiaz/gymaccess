import { Router, Request, Response } from 'express';

import { app } from './router';
import * as _ from 'underscore';

import ContratosSchema from '../models/contratos.model';
import { MongoError } from 'mongodb';


app.get('/contratos', (req: Request, res: Response) => {
    ContratosSchema.find()
        .populate('usuario')
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

app.get('/contratos/usuario/:usuario', (req: Request, res: Response) => {
    const id = req.params.usuario;

    ContratosSchema.find({ usuario: id })
        .populate('usuario')
        .populate('plan')
        .sort({ fecha: 1 })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            const hoy = new Date();

            data = data.filter((e) => {
                let caducidad = new Date(e.fecha);
                caducidad.setDate(caducidad.getDate() + 30);
                console.log('Ahora:' + hoy.getHours() + hoy.getMonth())
                console.log('Caduca:' + caducidad.getHours() + hoy.getMonth())
                return (hoy < caducidad);
            });

            res.json({
                ok: true,
                data
            });
        });
});

app.post('/contratos', (req: Request, res: Response) => {
    let body = req.body;

    let values = new ContratosSchema({
        usuario: body.usuario,
        plan: body.plan,
        fecha: new Date().toISOString().toString(),
        visitas: body.visitas,
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

app.put('/contratos/remove/:id', async (req: Request, res: Response) => {
    let id = req.params.id;
    let visitas: any;

    const valorAnterior = await ContratosSchema.findById(id, 'visitas');


    if (valorAnterior) {
        const value: any = valorAnterior.visitas;
        if (value !== null) {
            console.log('Entre');
            if (value === 0) {
                console.log('Cero');
                return res.status(400).json({
                    ok: false,
                    err: 'Visitas agotadas'
                });
            }
            if (value !== -1) {
                visitas = value - 1
            } else {
                visitas = value;
            }
        }
    }

    // console.log(visitas)

    ContratosSchema.findByIdAndUpdate(id, { visitas }, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data: 'Cambio almacenado',
            visitas: visitas
        });
    });
});

app.put('/contratos/add/:id', async (req: Request, res: Response) => {
    let id = req.params.id;
    let visitas: any;

    const valorAnterior = await ContratosSchema.findById(id, 'visitas');

    if (valorAnterior) {
        if (valorAnterior.visitas) {
            if (valorAnterior?.visitas !== -1) {
                visitas = valorAnterior?.visitas + 1
            }
        } else {
            return res.status(400).json({
                ok: false,
                err: 'Visitas agotadas'
            });
        }
    }

    ContratosSchema.findByIdAndUpdate(id, { visitas }, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data: 'Cambio almacenado',
            visitas: visitas
        });
    });
});

export default app;