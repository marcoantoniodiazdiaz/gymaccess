import { Router, Request, Response } from 'express';

import { app } from './router';
import bcrypt from 'bcrypt';
import * as _ from 'underscore';

import UsuariosSchema from '../models/usuarios.model';
import { MongoError } from 'mongodb';


app.get('/usuarios', (req: Request, res: Response) => {
	UsuariosSchema.find().sort({ nombre: 1 }).exec((err, data) => {
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

app.get('/usuarios/:id', (req: Request, res: Response) => {
	const id = req.params.id;

	UsuariosSchema.findById(id).sort({
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

app.post('/usuarios', (req: Request, res: Response) => {
	let body = req.body;
	body.email = body.email.trim(),

		body.password = bcrypt.hashSync(body.password, 10);

	let values = new UsuariosSchema({
		nombre: body.nombre,
		foto: body.foto,
		password: body.password,
		email: body.email,
		nac: new Date().toISOString(),
	});

	UsuariosSchema.create(values, (err: MongoError, data: any) => {
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

app.put('/usuarios/:id', (req: Request, res: Response) => {
	let id = req.params.id;
	let body = _.pick(req.body, [
		'nombre',
		'nac',
		'estatura',
		'peso',
		'telefono',
		'foto',
		'password',
		'notificaciones',
	]);

	UsuariosSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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