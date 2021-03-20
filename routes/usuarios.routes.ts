import { Router, Request, Response } from 'express';

import { app } from './router';
import bcrypt from 'bcrypt';
import * as _ from 'underscore';

import UsuariosSchema from '../models/usuarios.model';
import { MongoError } from 'mongodb';
import nodemailer from 'nodemailer';


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
	body.email = body.email.trim();

	const firstPass = body.password;

	body.password = bcrypt.hashSync(body.password, 10);

	let values = new UsuariosSchema({
		nombre: body.nombre,
		foto: body.foto,
		password: body.password,
		email: body.email,
		nac: new Date().toISOString(),
	});

	UsuariosSchema.create(values, async (err: MongoError, data: any) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		const transporter = nodemailer.createTransport({
			host: 'mail.gymaccess.com.mx',
			port: 465,
			// secure: false,
			auth: {
				user: 'direccion@gymaccess.com.mx',
				pass: 'B8OfGAysT1]i'
			}
		});

		const contentHTML = `
        <html>

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        </head>
        
        <body style="background-color: rgb(244, 244, 244);">
            <div style="width: 100%; height: 150px; background-color: rgb(231, 68, 54); padding-top: 30px;">
                <div class="container text-center" style="background-color: white; padding: 50px; ">
                    <h1>Bienvenido a GymAccess.</h1>
                    <img src="https://res.cloudinary.com/dttt56lma/image/upload/v1597962979/fdphkrkvj4adwcv6oene.png" height="60px " class="mt-4 "><br>
                    <p class="mt-3 " style="font-size: 130%; ">Nos complace en darle la bienvenida a nuestro sistema</p>
                    <div class="text-left mt-5 ">
                        <span>Sus credenciales de registro son:</span><br>
                        <span><strong>Email:</strong> ${body.email}</span><br>
                        <span><strong>Contraseña:</strong> ${firstPass}</span><br>
                        <span>Luego de ingresar usted puede cambiar su contraseña en el apartado de perfil.</span>
                    </div>
                </div>
                <div class="container text-center mb-5" style="background-color: rgb(231, 68, 54); padding: 30px; ">
                    <strong style="font-size: 120%; ">¿Nesesitas ayuda?</strong><br>
                    <span style="color: white; text-decoration: underline; ">Sigue este enlace y podemos contestar tus preguntas</span>
                </div>
            </div>
        </body>
        
        </html>
        `;


		const info = await transporter.sendMail({
			from: "'Dirección GymAccess' <direccion@gymaccess.com.mx>",
			to: data.email,
			subject: 'Bienvenido a GymAccess',
			html: contentHTML,
		});

		console.log("Hola");

		res.json({
			ok: true,
			data,
			email: info.messageId
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