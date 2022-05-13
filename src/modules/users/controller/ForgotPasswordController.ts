import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        const sendForgotPassword = new SendForgotPasswordEmailService();

        const { email } = req.body;

        await sendForgotPassword.excute({ email });

        return res.status(204).json();
    }
}
