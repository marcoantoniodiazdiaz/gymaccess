import { Router, Request, Response } from 'express';

import { app } from './router';
import { json } from 'body-parser';

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        status: 'El servidor esta en linea'
    })
});

export default app;