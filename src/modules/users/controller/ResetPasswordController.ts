import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        const resetPassword = new ResetPasswordService();

        const { password, token } = req.body;

        await resetPassword.excute({ token, password });

        return res.status(204).json();
    }
}
