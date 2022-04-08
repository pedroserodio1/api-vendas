import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/users';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
}

class ShowProductService {
    public async excute({ id }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('No users found', 404);
        }

        return user;
    }
}

export default ShowProductService;
