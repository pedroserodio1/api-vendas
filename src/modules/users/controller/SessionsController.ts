import { Request, Response } from 'express';
import CreateSesssionService from '../services/CreateSessionService';

export default class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const sessionService = new CreateSesssionService();

        const { email, password } = req.body;

        const session = await sessionService.excute({ email, password });

        return res.status(202).json(session);
    }
}
