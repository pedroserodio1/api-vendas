import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/users';
import UsersRepository from '../typeorm/repositories/UsersRepository';

class ListUserService {
    public async excute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.find();

        if (!user) {
            throw new AppError('No users found', 404);
        }

        return user;
    }
}

export default ListUserService;
