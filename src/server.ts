import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from 'path';
import "express-async-errors";
import cors from "cors";
import { router } from './routes';

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '..', 'swagger.json'), 'utf-8')
);

const app = express();
const port = 3333;
app.use(express.json());
app.use(cors());
app.use('/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.get('/terms', (request: Request, response: Response) => {
    return response.json({
        message: "Termos de serviço"
    })
});

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
});

app.listen(port, () => {
    console.log("Servidor rodando na porta 3333 - Projeto Controle de Estoque curso NodeJs")
});
