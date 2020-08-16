import { Router, Request, Response } from 'express';

import { app } from './router';
import bcrypt from 'bcrypt';
import * as _ from 'underscore';

import UsuariosSchema from '../models/usuarios.model';
import { MongoError } from 'mongodb';


app.get('/usuarios', (req: Request, res: Response) => {
	UsuariosSchema.find({ active: true }).sort({ nombre: 1 }).exec((err, data) => {
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

// UserExists
app.get('/usuarios/exists/email/:email', (req: Request, res: Response) => {
	const email = req.params.email;

	UsuariosSchema.findOne({ email }).exec((err, data) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		if (!data) {
			return res.status(400).json({
				ok: false,
				data: false
			});
		}

		res.json({
			ok: true,
			data: true
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

app.put('/usuarios/delete/:id', (req: Request, res: Response) => {
	let id = req.params.id;
	let body = _.pick(req.body, [
		'active',
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