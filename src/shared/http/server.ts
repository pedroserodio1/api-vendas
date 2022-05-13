import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/appError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import swaggerFile from '@config/swagger.json';
import swagger from 'swagger-ui-express';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/files', express.static(uploadConfig.directory));
app.use('/api/v1', routes);
app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));
app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            code: error.statusCode,
            message: error.message,
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen('3333', () => {
    /* eslint-disable no-console */
    console.log('Server started on port 3333! 😁');
});
