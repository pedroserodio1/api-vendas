import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UsersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listUsers = new ListUserService();

        const users = await listUsers.excute();

        return res.status(200).json(users);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const createUser = new CreateUserService();

        const { name, email, password } = req.body;

        const user = await createUser.excute({ name, email, password });

        return res.status(201).json(user);
    }
}
